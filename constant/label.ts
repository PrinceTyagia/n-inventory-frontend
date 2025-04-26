export const sidebarItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: "📊",
  },
  {
    label: "Inventory Management",
    icon: "📦",
    children: [
      {
        label: "📋 All Product",
        path: "/dashboard/inventory/product",
        permission: "product.read",
      },
      {
        label: "➕ Add Product",
        path: "/dashboard/inventory/add-product",
        permission: "product.add",
      },
      {
        label: "🚚 Receiving Stock",
        path: "/dashboard/inventory/receive-stock",
        permission: "stock.add",
      },
      {
        label: "🧪 Batch & Expiry Management",
        path: "/dashboard/inventory/batch-expiry",
        permission: "batch.read",
      },
      {
        label: "⚖️ Stock Adjustment",
        path: "/dashboard/inventory/adjustment",
        permission: "stock.update",
      },
      {
        label: "🔁 Stock Transfer",
        path: "/dashboard/inventory/transfer",
        permission: "stock.transfer",
      },
      {
        label: "🌡️ Cold Chain Monitor",
        path: "/dashboard/inventory/cold-chain",
        permission: "cold-chain.read",
      },
      {
        label: "🚨 Inventory Alerts",
        path: "/dashboard/inventory/alerts",
        permission: "alerts.read",
      },
      {
        label: "🚫 Quarantine Stock",
        path: "/dashboard/inventory/quarantine-stock",
        permission: "quarantine.read",
      },
      {
        label: "🧪 Controlled Substances",
        path: "/dashboard/inventory/controlled-substances",
        permission: "controlled.read",
      },
      {
        label: "🏷️ Barcode & QR",
        path: "/dashboard/inventory/barcode-qr",
        permission: "barcode.read",
      },
      {
        label: "📤 Inventory Import/Export",
        path: "/dashboard/inventory/import-export",
        permission: "inventory.import-export",
      },
      {
        label: "📜 Inventory Logs",
        path: "/dashboard/inventory/logs",
        permission: "inventory.logs.read",
      },
    ],
  },
  {
    label: "Procurement",
    icon: "🛒",
    children: [
      {
        label: "📦 Purchase Order",
        path: "/dashboard/procurement/purchase-order",
        permission: "purchase.read",
      },
      {
        label: "📝 Create Order",
        path: "/dashboard/procurement/create-order",
        permission: "purchase.add",
      },
      {
        label: "📑 Vendor Quotations",
        path: "/dashboard/procurement/vendor-quotations",
        permission: "quotation.read",
      },
      {
        label: "📥 Goods Receipt Note",
        path: "/dashboard/procurement/goods-receipt",
        permission: "goods-receipt.read",
      },
      {
        label: "↩️ Return to Vendor",
        path: "/dashboard/procurement/return-vendor",
        permission: "purchase.return",
      },
      {
        label: "📊 Purchase Analytics",
        path: "/dashboard/procurement/analytics",
        permission: "purchase.analytics.read",
      },
    ],
  },
  {
    label: "Sales & POS",
    icon: "💳",
    children: [
      {
        label: "🛍️ Create Retail Sale",
        path: "/dashboard/sales/retail-sale",
        permission: "sales.retail.add",
      },
      {
        label: "🏢 Create Wholesale Sale",
        path: "/dashboard/sales/wholesale-sale",
        permission: "sales.wholesale.add",
      },
      {
        label: "📈 Sales History",
        path: "/dashboard/sales/history",
        permission: "sales.read",
      },
      {
        label: "🖥️ POS Terminal",
        path: "/dashboard/sales/terminal",
        permission: "pos.read",
      },
      {
        label: "📷 Prescription Upload",
        path: "/dashboard/sales/prescription",
        permission: "prescription.add",
      },
      {
        label: "🧾 Generate Invoice",
        path: "/dashboard/sales/invoice",
        permission: "invoice.read",
      },
    ],
  },
  {
    label: "Warehouses",
    icon: "🏬",
    children: [
      {
        label: "📍 All Locations",
        path: "/dashboard/warehouse/all-locations",
        permission: "warehouse.read",
      },
      {
        label: "➕ Add Warehouse",
        path: "/dashboard/warehouse/add",
        permission: "warehouse.add",
      },
      {
        label: "🔁 Transfer Stock",
        path: "/dashboard/warehouse/transfer-stock",
        permission: "warehouse.transfer",
      },
      {
        label: "📦 Stock per Location",
        path: "/dashboard/warehouse/location-stock",
        permission: "warehouse.stock.read",
      },
      {
        label: "🌡️ Cold Chain Monitor",
        path: "/dashboard/warehouse/cold-chain",
        permission: "cold-chain.read",
      },
    ],
  },
  {
    label: "Orders",
    icon: "📦",
    children: [
      {
        label: "📋 All Orders",
        path: "/dashboard/orders/all",
        permission: "orders.read",
      },
      {
        label: "➕ New Order Request",
        path: "/dashboard/orders/new",
        permission: "orders.add",
      },
      {
        label: "🛍️ Retail Orders",
        path: "/dashboard/orders/retail",
        permission: "orders.retail.read",
      },
      {
        label: "🏢 Wholesale Orders",
        path: "/dashboard/orders/wholesale",
        permission: "orders.wholesale.read",
      },
      {
        label: "✅ Order Fulfillment",
        path: "/dashboard/orders/fulfillment",
        permission: "orders.fulfill",
      },
      {
        label: "🚚 Delivery Tracking",
        path: "/dashboard/orders/tracking",
        permission: "orders.track",
      },
    ],
  },
  {
    label: "Customers & CRM",
    icon: "👥",
    children: [
      {
        label: "📒 All Customers",
        path: "/dashboard/customers/all",
        permission: "customers.read",
      },
      {
        label: "👨‍👩‍👧 Customer Groups",
        path: "/dashboard/customers/groups",
        permission: "customers.groups.read",
      },
      {
        label: "🎁 Loyalty Program",
        path: "/dashboard/customers/loyalty",
        permission: "loyalty.read",
      },
      {
        label: "💊 Prescriptions",
        path: "/dashboard/customers/prescriptions",
        permission: "prescriptions.read",
      },
      {
        label: "⏰ Refill Reminders",
        path: "/dashboard/customers/refill-reminders",
        permission: "refill.read",
      },
      {
        label: "📬 Communication Logs",
        path: "/dashboard/customers/communications",
        permission: "communication.read",
      },
    ],
  },
  {
    label: "Suppliers & Vendors",
    icon: "🏪",
    children: [
      {
        label: "📒 All Suppliers",
        path: "/dashboard/suppliers/all",
        permission: "suppliers.read",
      },
      {
        label: "➕ Add Supplier",
        path: "/dashboard/suppliers/add",
        permission: "suppliers.add",
      },
      {
        label: "📜 Purchase History",
        path: "/dashboard/suppliers/purchase-history",
        permission: "suppliers.purchase.read",
      },
      {
        label: "💸 Vendor Payments",
        path: "/dashboard/suppliers/payments",
        permission: "payments.read",
      },
    ],
  },
  {
    label: "Reports & Analytics",
    icon: "📈",
    children: [
      {
        label: "📦 Stock Report",
        path: "/dashboard/reports/stock",
        permission: "reports.stock.read",
      },
      {
        label: "⏳ Expiry Report",
        path: "/dashboard/reports/expiry",
        permission: "reports.expiry.read",
      },
      {
        label: "💰 Sales Report",
        path: "/dashboard/reports/sales",
        permission: "reports.sales.read",
      },
      {
        label: "🧾 Purchase Report",
        path: "/dashboard/reports/purchase",
        permission: "reports.purchase.read",
      },
      {
        label: "📊 Forecasting",
        path: "/dashboard/reports/forecast",
        permission: "reports.forecast.read",
      },
      {
        label: "📉 Profit & Loss",
        path: "/dashboard/reports/profit-loss",
        permission: "reports.pl.read",
      },
      {
        label: "📋 Audit Logs",
        path: "/dashboard/reports/audit-logs",
        permission: "audit.read",
      },
    ],
  },
  {
    label: "Compliance",
    icon: "⚖️",
    children: [
      {
        label: "📋 Drug Regulation Logs",
        path: "/dashboard/compliance/drug-logs",
        permission: "compliance.drugs.read",
      },
      {
        label: "📄 License Management",
        path: "/dashboard/compliance/license",
        permission: "compliance.license.read",
      },
      {
        label: "🚨 Narcotics Register",
        path: "/dashboard/compliance/narcotics",
        permission: "compliance.narcotics.read",
      },
      {
        label: "🧾 GST Filing Reports",
        path: "/dashboard/compliance/gst-reports",
        permission: "compliance.gst.read",
      },
      {
        label: "📨 E-Way Bill / Invoice",
        path: "/dashboard/compliance/e-way-bill",
        permission: "compliance.ewaybill.read",
      },
    ],
  },
  {
    label: "Roles & User",
    icon: "⚙️",
    children: [
      {
        label: "👤 User List & Invites",
        path: "dashboard/users/users",
        permission: "users.read",
      },
      {
        label: "🧑‍💼 Manage Roles & Permissions",
        path: "dashboard/users/roles-permissions",
        permission: "roles.read",
      },
      {
        label: "📑 Session Logs",
        path: "dashboard/users/session",
        permission: "roles.read",
      },
    ],
  },
  {
    label: "Settings",
    icon: "⚙️",
    permission: "settings.read",
    children: [
      {
        label: "🏢 Organization Settings",
        path: "/dashboard/settings/organization",
        permission: "settings.organization.read",
      },
      {
        label: "💰 Tax Settings",
        path: "/dashboard/settings/tax",
        permission: "settings.tax.read",
      },
      {
        label: "📦 Units & Categories",
        path: "/dashboard/settings/units-categories",
        permission: "settings.units-categories.read",
      },
      {
        label: "🏷️ Brand Management",
        path: "/dashboard/settings/brands",
        permission: "settings.brands.read",
      },
      {
        label: "💸 Pricing Rules",
        path: "/dashboard/settings/pricing-rules",
        permission: "settings.pricing-rules.read",
      },
      {
        label: "📃 Billing Plan",
        path: "/dashboard/settings/billing",
        permission: "settings.billing.read",
      },
    ],
  },
];

export const modulePermissions = [
  {
    module: "product",
    permissions: ["read", "add", "update", "delete"],
    updateReason: "To modify product details like name, pricing, stock, or category."
  },
  {
    module: "stock",
    permissions: ["read", "add", "update", "delete"],
    updateReason: "To update stock levels, corrections, or adjustments."
  },
  {
    module: "batch",
    permissions: ["read", "add", "update", "delete"],
    updateReason: "To edit batch numbers, expiry dates, or quantity changes."
  },
  {
    module: "cold-chain",
    permissions: ["read", "add", "update", "delete"],
    updateReason: "To change temperature logs or associated storage conditions."
  },
  {
    module: "alerts",
    permissions: ["read", "add", "update", "delete"],
    updateReason: "To manage threshold levels for out-of-stock or expiry alerts."
  },
  {
    module: "quarantine",
    permissions: ["read", "add", "update", "delete"],
    updateReason: "To release or discard items from quarantine status."
  },
  {
    module: "controlled",
    permissions: ["read", "add", "update", "delete"],
    updateReason: "To modify handling records or logs for controlled substances."
  },
  {
    module: "barcode",
    permissions: ["read", "add", "update", "delete"],
    updateReason: "To change barcode format or reassociate with a different product."
  },
  {
    module: "inventory.logs",
    permissions: ["read"],
    updateReason: "Read-only logs to monitor inventory actions (no update)."
  },
  {
    module: "purchase",
    permissions: ["read", "add", "update", "delete"],
    updateReason: "To change purchase order details or supplier info."
  },
  {
    module: "quotation",
    permissions: ["read", "add", "update", "delete"],
    updateReason: "To modify quotation prices, expiry, or terms."
  },
  {
    module: "goods-receipt",
    permissions: ["read", "add", "update", "delete"],
    updateReason: "To update received quantity, invoice, or date."
  },
  {
    module: "sales",
    permissions: ["read", "add", "update", "delete"],
    updateReason: "To edit sales entries or customer details."
  },
  {
    module: "pos",
    permissions: ["read", "add", "update", "delete"],
    updateReason: "To configure POS settings or fix transaction data."
  },
  {
    module: "invoice",
    permissions: ["read", "add", "update", "delete"],
    updateReason: "To correct invoice details or customer billing info."
  },
  {
    module: "warehouse",
    permissions: ["read", "add", "update", "delete"],
    updateReason: "To edit warehouse address, capacity, or zone mapping."
  },
  {
    module: "orders",
    permissions: ["read", "add", "update", "delete"],
    updateReason: "To edit order status, customer details, or product list."
  },
  {
    module: "customers",
    permissions: ["read", "add", "update", "delete"],
    updateReason: "To update customer profiles or contact information."
  },
  {
    module: "loyalty",
    permissions: ["read", "add", "update", "delete"],
    updateReason: "To update loyalty program rules or customer points."
  },
  {
    module: "prescriptions",
    permissions: ["read", "add", "update", "delete"],
    updateReason: "To re-upload or correct prescription details."
  },
  {
    module: "refill",
    permissions: ["read", "add", "update", "delete"],
    updateReason: "To adjust refill cycles or medicine list."
  },
  {
    module: "communication",
    permissions: ["read", "add", "update", "delete"],
    updateReason: "To edit communication templates or recipient groups."
  },
  {
    module: "suppliers",
    permissions: ["read", "add", "update", "delete"],
    updateReason: "To change supplier address, contact, or products supplied."
  },
  {
    module: "payments",
    permissions: ["read", "add", "update", "delete"],
    updateReason: "To edit vendor payment status or method."
  },
  {
    module: "reports",
    permissions: ["read"],
    updateReason: "Reports are read-only; updates not allowed."
  },
  {
    module: "audit",
    permissions: ["read"],
    updateReason: "Audit logs are immutable and cannot be changed."
  },
  {
    module: "compliance",
    permissions: ["read", "add", "update", "delete"],
    updateReason: "To update drug licenses, registers, or regulatory data."
  },
  {
    module: "users",
    permissions: ["read", "add", "update", "delete"],
    updateReason: "To change user roles, info, or deactivate/reactivate users."
  },
  {
    module: "roles",
    permissions: ["read", "add", "update", "delete"],
    updateReason: "To edit role names, permission sets, or assign roles."
  },
  {
    module: "settings",
    permissions: ["read", "add", "update", "delete"],
    updateReason: "To configure pricing rules, tax rates, and organization settings."
  },
  {
    module: "organization",
    permissions: ["read", "add", "update", "delete"],
    updateReason: "To update company name, email, or business info."
  }
];

// ✅ Combined permissions array like "product.read", "product.add", etc.
export const allCombinedPermissions = modulePermissions.flatMap(({ module, permissions }) =>
  permissions.map((p) => `${module}.${p}`)
);
