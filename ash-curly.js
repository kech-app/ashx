defmodule Kech.Demo.Order {
  require Money

  use Ash.Resource,
    data_layer: AshPostgres.DataLayer,
    extensions: [AshStateMachine, AshAdmin.Resource]

  attributes {
    uuid_primary_key :id

    attribute :price, AshMoney.Types.Money
    attribute :quantity, :decimal

    attribute :error, :string
    attribute :error_state, :string

    # :state attribute is added for you by `state_machine`
    # however, you can add it yourself, and you will be guided by
    # compile errors on what states need to be allowed by your type.
  }

  state_machine {
    initial_states([:pending])
    default_initial_state(:pending)

    transitions {
      transition(:confirm, from: :pending, to: :confirmed)
      transition(:begin_delivery, from: :confirmed, to: :on_its_way)
      transition(:package_arrived, from: :on_its_way, to: :arrived)
      transition(:error, from: [:pending, :confirmed, :on_its_way], to: :error)
    }
  }

  admin {
    table_columns [:quantity, :price, :amount]
    resource_group :order_management
    # show_fields([:quantity, :price, :amount])
  }

  postgres {
    table "demo_orders"
    repo Kech.Repo
  }

  actions {
    defaults [:read, :update, :destroy]

    create :create {
      accept [:state, :price, :quantity]
    }

    read :by_id {
      argument :id, :uuid, allow_nil?: false
      get? true
      filter expr(id == ^arg(:id))
    }

    update :confirm {
      # accept [...]
      # you can change other attributes
      # or { anything else an action can normally {
      # this transition will be validated according to
      # the state machine rules above
      change transition_state(:confirmed)
    }

    update :begin_delivery {
      # accept [...]
      change transition_state(:on_its_way)
    }

    update :package_arrived {
      # accept [...]
      change transition_state(:arrived)
    }

    update :error {
      accept [:error_state, :error]
      change transition_state(:error)
    }
  }

  code_interface {
    define_for Kech.Demo
    define :create, action: :create
    define :read, action: :read
    define :update, action: :update
    define :destroy, action: :destroy
    define :get_by_id, args: [:id], action: :by_id

    define :confirm
    define :begin_delivery
    define :package_arrived
  }

  changes {
    # any failures should be captured and transitioned to the error state
    change after_transaction(fn
             changeset, {:ok, result} ->
               {:ok, result}

             changeset, {:error, error} ->
               message = Exception.message(error)

               changeset.data
               |> Ash.Changeset.for_update(:error, %{
                 message: message,
                 error_state: changeset.data.state
               })
               |> Kech.Demo.update()
           }),
           on: [:update]
  }

  calculations {
    calculate :amount, AshMoney.Types.Money, expr(quantity * 10 / 4 * price)
  }

  multitenancy {
    strategy :context
  }
}

# This works
# calculate :amount2, AshMoney.Types.Money, expr(fragment("?", price))
