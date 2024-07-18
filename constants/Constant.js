import homeImprovements from '@/assets/home-improvements.webp';
import guides from '@/assets/property-guide.webp';
import policies from '@/assets/policies.webp';
import housingScheme from '@/assets/schemes.webp';
import articles from '@/assets/articles.webp';

// export const APP_BASE_URL = 'https://grance.in/albion/api';
export const APP_BASE_URL = "https://backend.albionpropertyhub.com/api"



export const propertyTypes = ['flat', 'villa', 'plot', 'shop', 'office' , 'house']
export const propertyActions = ['sell', 'rent']

export const blogCategories = [
    {
        key: 'Home Improvements',
        image: homeImprovements
    },
    {
        key: 'Guides',
        image: guides
    },
    {
        key: 'Policies',
        image: policies
    },
    {
        key: 'Housing Schemes',
        image: housingScheme
    },
    {
        key: 'Articles',
        image: articles
    },
]



export const colorCodes = [
    {
        color: "#C0392B",
        backgroundColor: "#F2D7D5"
    },
    {
        color: "#B03A2E",
        backgroundColor: "#FADBD8"
    },
    {
        color: "#76448A",
        backgroundColor: "#EBDEF0"
    },
    {
        color: "#1F618D",
        backgroundColor: "#D4E6F1"
    },
    {
        color: "#B9770E",
        backgroundColor: "#FAE5D3 "
    },
    {
        color: "#117A65",
        backgroundColor: "#D0ECE7 "
    }
]

export const paymentCard = {
    "free" : "#D7BDE2",
    "basic" : "#808080",
    "silver" : "#C0C0C0",
    "gold" : "#F1CB00",
    "standard":"#3498db",
    "premium": "#27ae60",
    "premium plus": "#9b59b6",
    "we support": "#e67e22",
    "bronze" : "#CD7F32"
}

export const buyBudgetArray = [
  500000, 1000000, 1500000, 2000000, 3000000, 4000000, 5000000, 6000000,
  7000000, 8000000, 9000000, 10000000, 12000000, 14000000, 16000000, 18000000,
  20000000, 22000000, 24000000, 28000000, 30000000, 50000000, 80000000,
  100000000, 150000000, 10000000,
];
export const rentBudgetArray = [
  5000, 10000, 15000, 25000, 40000, 60000, 100000, 150000, 200000, 300000,
  400000, 500000, 800000, 1000000,
];