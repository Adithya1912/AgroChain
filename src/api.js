// const API_URL = "http://localhost:5000/api";

// // A reusable helper function for handling fetch responses and errors
// async function handleResponse(res) {
//   const data = await res.json();
//   if (!res.ok) {
//     throw new Error(data.error || 'An unknown error occurred.');
//   }
//   return data;
// }

// export async function registerUser(name, role) {
//   const res = await fetch(`${API_URL}/auth/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ name, role }),
//   });
//   return handleResponse(res);
// }

// export async function loginUser(public_id, role) {
//   const res = await fetch(`${API_URL}/auth/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ public_id, role }),
//   });
//   return handleResponse(res);
// }

// export async function createProduct({ name, price, quantity, farmerPublicId }) {
//   const res = await fetch(`${API_URL}/products/create`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ name, price, quantity, farmerPublicId }),
//   });
//   return handleResponse(res);
// }

// export async function transferOwnership(productUid, newOwnerPublicId, actorId) {
//     const res = await fetch(`${API_URL}/products/transfer`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ productUid, newOwnerPublicId, actorId }),
//     });
//     return handleResponse(res);
// }

// export async function getProducts(ownerId = '') {
//   const url = ownerId ? `${API_URL}/products/all?ownerId=${ownerId}` : `${API_URL}/products/all`;
//   const res = await fetch(url);
//   return handleResponse(res);
// }

// export async function getProductByUid(productUid) {
//   const res = await fetch(`${API_URL}/products/${productUid}`);
//   return handleResponse(res);
// }

// export async function getProductHistory(productUid) {
//   const res = await fetch(`${API_URL}/products/history/${productUid}`);
//   return handleResponse(res);
// }

// // ** THIS IS THE NEW FUNCTION YOU NEED TO ADD **
// export async function addTransportFee(productUid, distributorId, transportFee) {
//   const res = await fetch(`${API_URL}/products/add-fee`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ productUid, distributorId, transportFee }),
//   });
//   return handleResponse(res);
// }


// const API_URL = "http://localhost:5000/api";

// export async function registerUser(name, role) {
//   const res = await fetch(`${API_URL}/auth/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ name, role }),
//   });
//   return res.json();
// }

// export async function loginUser(public_id, role) {
//   const res = await fetch(`${API_URL}/auth/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ public_id, role }),
//   });
//   return res.json();
// }

// export async function createProduct(name, price, quantity, farmerPublicId) {
//   const res = await fetch(`${API_URL}/products/create`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ name, price, quantity, farmerPublicId }),
//   });
//   return res.json();
// }

// export async function acquireProduct(productUid, distributorId, transportFee) {
//     const res = await fetch(`${API_URL}/products/acquire`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ productUid, distributorId, transportFee }),
//     });
//     if (!res.ok) {
//         const errorText = await res.text();
//         throw new Error(errorText || `HTTP error! status: ${res.status}`);
//     }
//     return res.json();
// }

// export async function searchAllProducts() {
//     const res = await fetch(`${API_URL}/products/search-all`);
//     return res.json();
// }

// export async function getProducts(ownerId) {
//   const res = await fetch(`${API_URL}/products/owner?ownerId=${ownerId}`);
//   return res.json();
// }

// export async function getProductHistory(productUid) {
//   const res = await fetch(`${API_URL}/products/history/${productUid}`);
//   return res.json();
// }

// const API_URL = "http://localhost:5000/api";

// export async function registerUser(name, role) {
//   const res = await fetch(`${API_URL}/auth/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ name, role }),
//   });
//   return res.json();
// }

// export async function loginUser(public_id, role) {
//   const res = await fetch(`${API_URL}/auth/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ public_id, role }),
//   });
//   return res.json();
// }

// export async function createProduct(name, price, quantity, farmerPublicId) {
//   const res = await fetch(`${API_URL}/products/create`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ name, price, quantity, farmerPublicId }),
//   });
//   return res.json();
// }

// export async function acquireProduct(productUid, distributorId, transportFee) {
//     const res = await fetch(`${API_URL}/products/acquire`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ productUid, distributorId, transportFee }),
//     });
//     if (!res.ok) {
//         const errorText = await res.text();
//         throw new Error(errorText || `HTTP error! status: ${res.status}`);
//     }
//     return res.json();
// }

// // **FUNCTION ADDED BACK**
// export async function transferOwnership(productUid, newOwnerPublicId, actorId) {
//   const res = await fetch(`${API_URL}/products/transfer`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ productUid, newOwnerPublicId, actorId }),
//   });
//   return res.json();
// }


// export async function searchAllProducts() {
//     const res = await fetch(`${API_URL}/products/search-all`);
//     return res.json();
// }

// export async function getProducts(ownerId) {
//   const res = await fetch(`${API_URL}/products/owner?ownerId=${ownerId}`);
//   return res.json();
// }

// export async function getProductHistory(productUid) {
//   const res = await fetch(`${API_URL}/products/history/${productUid}`);
//   return res.json();
// }
// // --- ADD THESE NEW FUNCTIONS TO api.js ---

// export async function requestTransferToRetailer(productUid, retailerId, actorId) {
//   const res = await fetch(`${API_URL}/products/request-transfer`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ productUid, retailerId, actorId }),
//   });
//   return res.json();
// }

// export async function getPendingRetailerRequests(retailerId) {
//   const res = await fetch(`${API_URL}/products/pending-requests?retailerId=${retailerId}`);
//   return res.json();
// }

// export async function respondToRetailerRequest(productUid, retailerId, decision) {
//   const res = await fetch(`${API_URL}/products/respond-request`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ productUid, retailerId, decision }),
//   });
//   return res.json();
// }

// export async function acknowledgeRejection(productUid, actorId) {
//   const res = await fetch(`${API_URL}/products/acknowledge-rejection`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ productUid, actorId }),
//   });
//   return res.json();
// }

// const API_URL = "http://localhost:5000/api";

// export async function registerUser(name, role) {
//   const res = await fetch(`${API_URL}/auth/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ name, role }),
//   });
//   return res.json();
// }

// export async function loginUser(public_id, role) {
//   const res = await fetch(`${API_URL}/auth/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ public_id, role }),
//   });
//   return res.json();
// }

// export async function createProduct(name, price, quantity, farmerPublicId) {
//   const res = await fetch(`${API_URL}/products/create`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ name, price, quantity, farmerPublicId }),
//   });
//   return res.json();
// }

// export async function acquireProduct(productUid, distributorId, transportFee) {
//     const res = await fetch(`${API_URL}/products/acquire`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ productUid, distributorId, transportFee }),
//     });
//     if (!res.ok) {
//         const errorText = await res.text();
//         throw new Error(errorText || `HTTP error! status: ${res.status}`);
//     }
//     return res.json();
// }

// export async function transferOwnership(productUid, newOwnerPublicId, actorId) {
//   const res = await fetch(`${API_URL}/products/transfer`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ productUid, newOwnerPublicId, actorId }),
//   });
//   return res.json();
// }

// export async function searchAllProducts() {
//     const res = await fetch(`${API_URL}/products/search-all`);
//     return res.json();
// }

// export async function getProducts(ownerId) {
//   const res = await fetch(`${API_URL}/products/owner?ownerId=${ownerId}`);
//   return res.json();
// }

// export async function getProductHistory(productUid) {
//   const res = await fetch(`${API_URL}/products/history/${productUid}`);
//   return res.json();
// }

// // --- NEW FUNCTIONS FOR DISTRIBUTOR -> RETAILER WORKFLOW ---

// export async function requestTransferToRetailer(productUid, retailerId, actorId) {
//   const res = await fetch(`${API_URL}/products/request-transfer`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ productUid, retailerId, actorId }),
//   });
//   return res.json();
// }

// export async function getPendingRetailerRequests(retailerId) {
//   const res = await fetch(`${API_URL}/products/pending-requests?retailerId=${retailerId}`);
//   return res.json();
// }

// export async function respondToRetailerRequest(productUid, retailerId, decision) {
//   const res = await fetch(`${API_URL}/products/respond-request`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ productUid, retailerId, decision }),
//   });
//   return res.json();
// }

// export async function acknowledgeRejection(productUid, actorId) {
//   const res = await fetch(`${API_URL}/products/acknowledge-rejection`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ productUid, actorId }),
//   });
//   return res.json();
// }
const API_URL = "http://localhost:5000/api";

export async function registerUser(name, role) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, role }),
  });
  return res.json();
}

export async function loginUser(public_id, role) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ public_id, role }),
  });
  return res.json();
}

export async function createProduct(name, price, quantity, farmerPublicId) {
  const res = await fetch(`${API_URL}/products/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price, quantity, farmerPublicId }),
  });
  return res.json();
}

export async function acquireProduct(productUid, distributorId, transportFee) {
    const res = await fetch(`${API_URL}/products/acquire`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productUid, distributorId, transportFee }),
    });
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || `HTTP error! status: ${res.status}`);
    }
    return res.json();
}

export async function transferOwnership(productUid, newOwnerPublicId, actorId) {
  const res = await fetch(`${API_URL}/products/transfer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productUid, newOwnerPublicId, actorId }),
  });
  return res.json();
}

export async function searchAllProducts() {
    const res = await fetch(`${API_URL}/products/search-all`);
    return res.json();
}

export async function getProducts(ownerId) {
  const res = await fetch(`${API_URL}/products/owner?ownerId=${ownerId}`);
  return res.json();
}

export async function getProductHistory(productUid) {
  const res = await fetch(`${API_URL}/products/history/${productUid}`);
  return res.json();
}

export async function setRetailerPrice(productUid, retailerId, newPrice) {
  const res = await fetch(`${API_URL}/products/set-retailer-price`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productUid, retailerId, newPrice }),
  });
  return res.json();
}

export async function requestTransferToRetailer(productUid, retailerId, actorId) {
  const res = await fetch(`${API_URL}/products/request-transfer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productUid, retailerId, actorId }),
  });
  return res.json();
}

export async function getPendingRetailerRequests(retailerId) {
  const res = await fetch(`${API_URL}/products/pending-requests?retailerId=${retailerId}`);
  return res.json();
}

export async function respondToRetailerRequest(productUid, retailerId, decision) {
  const res = await fetch(`${API_URL}/products/respond-request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productUid, retailerId, decision }),
  });
  return res.json();
}

export async function acknowledgeRejection(productUid, actorId) {
  const res = await fetch(`${API_URL}/products/acknowledge-rejection`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productUid, actorId }),
  });
  return res.json();
}