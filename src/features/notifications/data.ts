export type OrderStatus = 'ACCEPTED' | 'PREPARING' | 'COMPLETED' | 'IN_DELIVERY' | 'CANCELLED';

export type Notification =
    | {
          id: number;
          type: 'order_status';
          orderId: string;
          orderTitle: string;
          orderImages: string[];
          itemsCount: number;
          status: OrderStatus;
          isRead: boolean;
          timeAgo: string;
          createdAt: string;
      }
    | {
          id: number;
          type: 'review_request';
          orderId: string;
          orderTitle: string;
          productId: number;
          productName: string;
          productImage: string;
          isRead: boolean;
          timeAgo: string;
          createdAt: string;
      };

export const statusConfig: Record<OrderStatus, { label: string; message: string; icon: string; colors: string; dotColor: string }> = {
    ACCEPTED: {
        label: 'Order Accepted',
        message: 'Your order has been accepted and confirmed.',
        icon: 'material-symbols:check-circle-outline-rounded',
        colors: 'text-emerald-600 bg-emerald-50 border-emerald-100',
        dotColor: 'bg-emerald-500',
    },
    PREPARING: {
        label: 'Being Prepared',
        message: 'Your order is currently being prepared.',
        icon: 'material-symbols:soup-kitchen-rounded',
        colors: 'text-amber-600 bg-amber-50 border-amber-100',
        dotColor: 'bg-amber-400',
    },
    IN_DELIVERY: {
        label: 'Out for Delivery',
        message: 'Your order is on its way to you!',
        icon: 'material-symbols:local-shipping-rounded',
        colors: 'text-blue-600 bg-blue-50 border-blue-100',
        dotColor: 'bg-blue-500',
    },
    COMPLETED: {
        label: 'Order Completed',
        message: 'Your order has been delivered successfully.',
        icon: 'material-symbols:task-alt-rounded',
        colors: 'text-primary bg-primary/5 border-primary/10',
        dotColor: 'bg-primary',
    },
    CANCELLED: {
        label: 'Order Cancelled',
        message: 'Your order has been cancelled.',
        icon: 'material-symbols:cancel-outline-rounded',
        colors: 'text-rose-600 bg-rose-50 border-rose-100',
        dotColor: 'bg-rose-500',
    },
};

const IMG = {
    rose:    'https://lh3.googleusercontent.com/aida-public/AB6AXuB_uUZDgMZS1UscbbRxg1sK0AGdMpQj2UY-HjAXfl8TzRFsRnSUdkiLueieX9x1bHQBvFHXtOleRx6I9RffTKpShvfcxHOKHMRMse-RzfTt7lEYz9MpriOOg93Hahgfp2STOO9obdsfgZd41d-As5vkOFNTL2MSbL1hlxsKk0bJxySeEfkdRBZNJ1GBXHB_Rg45l43h5GutqI_yQZp3bg_C2PlAjuUPbTR5fUSdpFjTRuL49ecc_pZk0gvo9LcQF9lMM1p6H8ChitNY',
    tulip:   'https://lh3.googleusercontent.com/aida-public/AB6AXuAGbFw2D-iGVr0uzcPWtJKPXd1j3dRQu2GgoETHpajTmN6OVvwl7CYFeDuhlVEkTVtvq4xZfvsqhIzbQNI4kNwb3JjxOzbP_AB0yZqlIjHdgueE3qbeqbNIVL77iuFcAqcU1j9jRqpyNOQDhNlP5zy8qEgyBSXN8nxmG0xXJFu-pObnEVgpBbzPhPwxptWLIQfWMv_NSjbe9JtMQuQGlZ8sWOxvfDUe60hY8CDeYQAz2rSUBPZQRRjaxqcQRorBT7Iw7AONS0uZ6dwj',
    spring:  'https://lh3.googleusercontent.com/aida-public/AB6AXuD5sdXkfH9qWe6DK8LCevkCBXD0c5pFr30P4juGUlT-16Cm1Jsi8dI5M0WlpkkJrsxqN_oaV_hxGNy8D_Ckrq-Oe7zzYxgAPouoDTuizT3KZe6S2MODp6cTxW5pfJgsHms8Os7OzRHEO_CIIBjGdqbksJSxujjYuoYYBNphHmiYQ9AhwddrI31HUQeklF9br3mG0nYB1_FT8XeETzTvXSrbyISWUYBW--jFP2qYXT7taH4096ZyeP0u1sd-i3GNGGgkTHhEJ_QaSKz0',
    choco:   'https://lh3.googleusercontent.com/aida-public/AB6AXuC07PWV6nCyQYn2CO8IUgUILfMDfNQ1BHTY2P_iKTPPyvJbG9OFiQJWeoHlYchvWY4LLVvGxFtI73yZkXaaXeUa3b9cBjk5Q3fJn00uEOzOhEwSwuMuSugZNpu-_UqxSDc76dEbC8LTPBLxqZZgT-RtdsuTfhah1cdnegdMLOYHTofZWkwEBvomVIZwQzgqxCJo1XnPaEAXEWcjT616ku0Vd2PiWa8J4NCi52XIP32yGXuRONedvhS97lJh4N0AZBW1kNsyLu8iPq5Y',
    macaron: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIN38nno1LALRalCHfybqCYib018UCs87tAcf74CehrHmQ62yHWSxvrIWxaIttTdq-IFMqBmzN_M-zkUxfvjeGHVpI_8PCKWDaTWCtza_GuE78Ba8D5sVe_M1LkqxyiQN8koV6xKJzDeOtb8E_rowIC06WVxMNCCqTCMaG-AVys4OdCeBRLD7bEY7yzFeFiwA5-V_tpbsCNyRkgVfQ4WJg3b-ZZrWZDj5OiZpYkU4XKA5lgak7IPAom2Vn9gIzQPpkexr2r7yJ6hJp',
};

export const mockNotifications: Notification[] = [
    // ── New (unread) ──────────────────────────────────────────────
    {
        id: 1,
        type: 'order_status',
        orderId: '24891',
        orderTitle: 'Pushti atirgullar + 2 items',
        orderImages: [IMG.rose, IMG.choco, IMG.macaron],
        itemsCount: 3,
        status: 'IN_DELIVERY',
        isRead: false,
        timeAgo: '30 min ago',
        createdAt: '2026-05-16T10:30:00',
    },
    {
        id: 2,
        type: 'review_request',
        orderId: '24512',
        orderTitle: 'Sariq lola (Premium)',
        productId: 3,
        productName: 'Sariq lola (Premium)',
        productImage: IMG.tulip,
        isRead: false,
        timeAgo: '2 hrs ago',
        createdAt: '2026-05-16T08:00:00',
    },
    {
        id: 7,
        type: 'order_status',
        orderId: '24905',
        orderTitle: 'Shokolad tort + Makaronlar',
        orderImages: [IMG.choco, IMG.macaron],
        itemsCount: 2,
        status: 'ACCEPTED',
        isRead: false,
        timeAgo: '4 hrs ago',
        createdAt: '2026-05-16T06:00:00',
    },
    {
        id: 8,
        type: 'review_request',
        orderId: '24780',
        orderTitle: 'Bahoriy kompozitsiya',
        productId: 5,
        productName: 'Bahoriy kompozitsiya',
        productImage: IMG.spring,
        isRead: false,
        timeAgo: '5 hrs ago',
        createdAt: '2026-05-16T05:00:00',
    },
    // ── Earlier (read) ────────────────────────────────────────────
    {
        id: 3,
        type: 'order_status',
        orderId: '24512',
        orderTitle: 'Sariq lola + Pushti atirgul',
        orderImages: [IMG.tulip, IMG.rose],
        itemsCount: 2,
        status: 'COMPLETED',
        isRead: true,
        timeAgo: 'Yesterday',
        createdAt: '2026-05-15T14:00:00',
    },
    {
        id: 4,
        type: 'order_status',
        orderId: '24512',
        orderTitle: 'Sariq lola + Pushti atirgul',
        orderImages: [IMG.tulip, IMG.rose],
        itemsCount: 2,
        status: 'PREPARING',
        isRead: true,
        timeAgo: 'Yesterday',
        createdAt: '2026-05-15T10:00:00',
    },
    {
        id: 5,
        type: 'order_status',
        orderId: '24512',
        orderTitle: 'Sariq lola + Pushti atirgul',
        orderImages: [IMG.tulip, IMG.rose],
        itemsCount: 2,
        status: 'ACCEPTED',
        isRead: true,
        timeAgo: 'Yesterday',
        createdAt: '2026-05-15T09:00:00',
    },
    {
        id: 6,
        type: 'order_status',
        orderId: '24100',
        orderTitle: 'Bahoriy kompozitsiya',
        orderImages: [IMG.spring],
        itemsCount: 1,
        status: 'CANCELLED',
        isRead: true,
        timeAgo: '3 days ago',
        createdAt: '2026-05-13T11:00:00',
    },
    {
        id: 9,
        type: 'review_request',
        orderId: '24300',
        orderTitle: 'Pushti atirgullar',
        productId: 1,
        productName: 'Pushti atirgullar',
        productImage: IMG.rose,
        isRead: true,
        timeAgo: '4 days ago',
        createdAt: '2026-05-12T15:00:00',
    },
    {
        id: 10,
        type: 'order_status',
        orderId: '24050',
        orderTitle: 'Makaronlar to\'plami',
        orderImages: [IMG.macaron],
        itemsCount: 1,
        status: 'COMPLETED',
        isRead: true,
        timeAgo: '5 days ago',
        createdAt: '2026-05-11T10:00:00',
    },
];
