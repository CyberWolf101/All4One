import { AccountBalanceOutlined, AccountBalanceWalletOutlined, DynamicFeedOutlined, FavoriteBorder, HelpOutline, LocalShippingOutlined, Person2Outlined, PersonAddAlt1Outlined, PersonOutline, PersonOutlineOutlined, PointOfSaleOutlined, SellOutlined, TransferWithinAStation, TransferWithinAStationOutlined, TrendingUpOutlined, VisibilityOutlined } from '@mui/icons-material'
// INSTEAD OF REQUIRE, WE IMPORT


export const AccountWigets = [
    { title: 'Orders', icon: <LocalShippingOutlined />, page: '/profile/orders' },
    { title: 'Auctions', icon: <SellOutlined />, page: '/auctioned' },
    { title: 'Wishlisted Items', icon: <FavoriteBorder />, page: '/profile/wishlist' },
    { title: 'Recently Viewed', icon: <VisibilityOutlined />, page: '/profile/recently-viewed' },
    { title: 'Details', icon: <PersonOutline />, page: '/profile/details' },
    { title: 'Help', icon: <HelpOutline />, page: '/profile/help' },
]



export const banks = [
    { name: 'Access Bank Plc.', code: '044' },
    { name: 'Ecobank Nigeria Plc.', code: '050' },
    { name: 'First Bank of Nigeria Limited', code: '011' },
    { name: 'Fidelity Bank Plc.', code: '070' },
    { name: 'Guaranty Trust bank Plc.', code: '058' },
    { name: 'Sterling Bank Plc.', code: '232' },
    { name: 'United Bank for Africa Plc.', code: '033' },
    // { name: 'Wema Bank Plc.', code: '945' },
    { name: 'Zenith Bank Plc.', code: '057' },
    // { name: 'Kuda Bank', code: '966' },
    // { name: 'VFD Microfinance Bank', code: '5037' },
];



export const menuWigets = [
    { title: 'Profile', link: '/user/profile/', adOn: true, icon: <PersonOutlineOutlined fontSize='small' /> },
    { title: 'Deposit', link: '/deposit-amount/', adOn: false, icon: <TransferWithinAStationOutlined fontSize='small' /> },
    { title: 'Post', link: '/post/', adOn: true, icon: < DynamicFeedOutlined fontSize='small' /> },
    { title: 'Transfer', link: '/withdraw-amount/', adOn: false, icon: <TrendingUpOutlined fontSize='small' /> },
    { title: 'Transactions', link: '/user-transactions/', adOn: true, icon: <AccountBalanceOutlined fontSize='small' /> },
    { title: 'Notifications', link: '/notifications/', adOn: true, icon: <Person2Outlined fontSize='small' /> },
    { title: 'Users', link: '/discover/', adOn: true, icon: <PersonAddAlt1Outlined fontSize='small' /> },
    // { title: 'Balance', link: '', adOn: true, icon:<AccountBalanceWalletOutlined fontSize='small'/> },
]