import React, { useState } from 'react';

// --- Helper Components for UI ---

// Icon for the track button
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

// Icon for order status
const PackageIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
);

// --- Main App Component ---

export default function App() {
    // --- STATE MANAGEMENT ---
    // Input fields for order number and email
    const [orderNumber, setOrderNumber] = useState('');
    const [email, setEmail] = useState('');

    // State to hold the fetched order data
    const [orderData, setOrderData] = useState(null);

    // Loading and error states
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // --- IMPORTANT: Shopify Configuration ---
    // Hardcoding the values since process.env is not available in this environment.
    const storefrontApiAccessToken = '6862f3b769d30524d61e9891cc78f056';
    const shopifyApiUrl = 'https://delan1.myshopify.com/api/2025-07/graphql.json';


    // --- GRAPHQL QUERY ---
    // This query fetches the order by order number and customer email.
    // It's designed to be secure for client-side use.
    const getOrderQuery = `
        query($orderNumber: String!, $customerEmail: String!) {
          orders(first: 1, query: "name:$orderNumber AND email:$customerEmail") {
            edges {
              node {
                id
                name
                processedAt
                totalPriceV2 {
                  amount
                  currencyCode
                }
                fulfillmentStatus
                shippingAddress {
                  name
                  address1
                  address2
                  city
                  zip
                  country
                }
                lineItems(first: 10) {
                  edges {
                    node {
                      title
                      quantity
                      variant {
                        image {
                          url
                          altText
                        }
                        priceV2 {
                          amount
                          currencyCode
                        }
                      }
                    }
                  }
                }
                fulfillments(first: 1) {
                  edges {
                    node {
                      trackingInfo(first: 1) {
                        number
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
    `;

    // --- DATA FETCHING ---
    const handleTrackOrder = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setOrderData(null);

        // Sanitize order number input: Ensure it includes the "#" prefix if missing.
        const formattedOrderNumber = orderNumber.startsWith('#') ? orderNumber : `#${orderNumber}`;

        try {
            const response = await fetch(shopifyApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Storefront-Access-Token': storefrontApiAccessToken,
                },
                body: JSON.stringify({
                    query: getOrderQuery,
                    variables: {
                        orderNumber: formattedOrderNumber,
                        customerEmail: email,
                    },
                }),
            });

            const result = await response.json();
            
            if (result.errors) {
                throw new Error(result.errors[0].message);
            }

            const order = result.data?.orders?.edges[0]?.node;

            if (order) {
                setOrderData(order);
            } else {
                setError("We couldn't find an order with that number and email. Please double-check your information.");
            }

        } catch (err) {
            console.error("Error fetching order:", err);
            setError("Something went wrong while trying to track your order. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };
    
    // --- HELPER FUNCTIONS FOR RENDERING ---
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans text-gray-800 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">Track Your Order</h1>
                    <p className="mt-2 text-lg text-gray-600">Enter your order details below to see its status.</p>
                </div>

                {/* Tracking Form */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md mb-8">
                    <form onSubmit={handleTrackOrder} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div className="md:col-span-1">
                            <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-1">Order Number</label>
                            <input
                                type="text"
                                id="orderNumber"
                                value={orderNumber}
                                onChange={(e) => setOrderNumber(e.target.value)}
                                placeholder="#1001"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />
                        </div>
                        <div className="md:col-span-1">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />
                        </div>
                        <div className="md:col-span-1">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center bg-indigo-600 text-white font-semibold py-2.5 px-4 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed transition"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Tracking...
                                    </>
                                ) : (
                                    <>
                                        <SearchIcon />
                                        Track
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
                
                {/* Display Area for Results, Errors, or Loading */}
                <div className="mt-8">
                    {error && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg" role="alert">
                            <p className="font-bold">Error</p>
                            <p>{error}</p>
                        </div>
                    )}

                    {orderData && (
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-fade-in">
                            {/* Order Header */}
                            <div className="p-6 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Order {orderData.name}</h2>
                                    <p className="text-sm text-gray-500 mt-1">Placed on {formatDate(orderData.processedAt)}</p>
                                </div>
                                <div className={`mt-4 sm:mt-0 px-3 py-1 text-sm font-medium rounded-full flex items-center ${
                                    orderData.fulfillmentStatus === 'FULFILLED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                    <PackageIcon className="w-4 h-4 mr-2" />
                                    {orderData.fulfillmentStatus.replace('_', ' ')}
                                </div>
                            </div>
                            
                            {/* Order Details */}
                            <div className="p-6">
                                {/* Tracking Info */}
                                {orderData.fulfillments?.edges[0]?.node?.trackingInfo[0] && (
                                     <div className="mb-6 bg-indigo-50 p-4 rounded-lg">
                                         <h3 className="font-bold text-indigo-800 mb-2">Tracking Information</h3>
                                         <p className="text-gray-700">
                                            Number: <span className="font-mono">{orderData.fulfillments.edges[0].node.trackingInfo[0].number}</span>
                                        </p>
                                        <a 
                                            href={orderData.fulfillments.edges[0].node.trackingInfo[0].url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-block mt-2 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-indigo-700 transition"
                                        >
                                            Track with Carrier
                                        </a>
                                     </div>
                                )}

                                {/* Items in Order */}
                                <h3 className="text-lg font-bold mb-4 text-gray-800">Items</h3>
                                <ul className="divide-y divide-gray-200">
                                    {orderData.lineItems.edges.map(({ node: item }) => (
                                        <li key={item.variant.image.url} className="py-4 flex">
                                            <img src={item.variant.image.url} alt={item.variant.image.altText || item.title} className="h-20 w-20 rounded-md object-cover mr-4" />
                                            <div className="flex-1">
                                                <p className="font-semibold">{item.title}</p>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="font-semibold">
                                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: item.variant.priceV2.currencyCode }).format(item.variant.priceV2.amount * item.quantity)}
                                            </p>
                                        </li>
                                    ))}
                                </ul>

                                {/* Shipping and Total */}
                                <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-lg font-bold mb-2 text-gray-800">Shipping Address</h3>
                                        <address className="not-italic text-gray-600">
                                            {orderData.shippingAddress.name}<br />
                                            {orderData.shippingAddress.address1}<br />
                                            {orderData.shippingAddress.address2 && <>{orderData.shippingAddress.address2}<br /></>}
                                            {orderData.shippingAddress.city}, {orderData.shippingAddress.zip}<br />
                                            {orderData.shippingAddress.country}
                                        </address>
                                    </div>
                                    <div className="text-left md:text-right">
                                        <h3 className="text-lg font-bold mb-2 text-gray-800">Order Total</h3>
                                        <p className="text-2xl font-bold">
                                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: orderData.totalPriceV2.currencyCode }).format(orderData.totalPriceV2.amount)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Simple CSS for fade-in animation */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
}

