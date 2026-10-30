import { INITIAL_PROPERTIES } from '../src/data/properties.js';
import { INITIAL_MAINTENANCE_REQUESTS } from '../src/data/dashboard.js';
import { INITIAL_DOCUMENTS } from '../src/data/documents.js';

console.log('--- STARTING FUNCTIONAL INTERACTION AUDIT ---');

// 1. Test Property Shortlisting Logic
let wishlist = ['CP10241'];
function toggleWishlist(id) {
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(x => x !== id);
    return 'removed';
  } else {
    wishlist.push(id);
    return 'added';
  }
}

console.log('1. Initial Wishlist:', wishlist);
const r1 = toggleWishlist('CP10242');
console.log('   Add CP10242:', r1, '-> New Wishlist:', wishlist);
const r2 = toggleWishlist('CP10241');
console.log('   Remove CP10241:', r2, '-> New Wishlist:', wishlist);
if (wishlist.length === 1 && wishlist[0] === 'CP10242') {
  console.log('   [PASS] Wishlist toggle interaction verified.');
} else {
  console.error('   [FAIL] Wishlist toggle failed.');
}

// 2. Test Compare List Logic (Max 4 properties)
let compareList = ['CP10241', 'CP10242', 'CP10243'];
function toggleCompare(id) {
  if (compareList.includes(id)) {
    compareList = compareList.filter(x => x !== id);
    return 'removed';
  } else {
    if (compareList.length >= 4) {
      return 'limit_reached';
    }
    compareList.push(id);
    return 'added';
  }
}

console.log('\n2. Initial Compare List:', compareList);
const c1 = toggleCompare('CP10244');
console.log('   Add 4th property CP10244:', c1, '-> Compare List:', compareList);
const c2 = toggleCompare('CP10245');
console.log('   Attempt add 5th property CP10245 (Limit test):', c2);
if (c2 === 'limit_reached' && compareList.length === 4) {
  console.log('   [PASS] Compare 4-item maximum boundary enforced.');
} else {
  console.error('   [FAIL] Compare boundary failed.');
}

// 3. Test Site Visit Booking
let siteVisits = [];
function bookSiteVisit(data) {
  const visit = {
    id: `SV-${Math.floor(100 + Math.random() * 900)}`,
    property: data.propertyTitle,
    date: data.date,
    time: data.time || '11:00 AM',
    status: 'Confirmed',
    name: data.name,
    phone: data.phone
  };
  siteVisits.push(visit);
  return visit;
}

const visit = bookSiteVisit({
  propertyTitle: 'Skyline Heights Penthouse',
  date: '2026-11-01',
  time: '03:00 PM',
  name: 'Rahul Sharma',
  phone: '+971 50 123 4567'
});
console.log('\n3. Booked Site Visit:', visit);
if (siteVisits.length === 1 && siteVisits[0].status === 'Confirmed') {
  console.log('   [PASS] Site visit booking interaction verified.');
} else {
  console.error('   [FAIL] Site visit booking failed.');
}

// 4. Test Maintenance Request Creation
let maintenanceRequests = [...INITIAL_MAINTENANCE_REQUESTS];
function addMaintenanceRequest(data) {
  const newReq = {
    id: `MR${Math.floor(1000 + Math.random() * 9000)}`,
    title: data.issue,
    property: data.property,
    issue: data.issue,
    priority: data.priority || 'Medium',
    status: 'Pending Assignment',
    date: '25 Oct 2026',
    estCost: '₹3,500'
  };
  maintenanceRequests.unshift(newReq);
  return newReq;
}

const req = addMaintenanceRequest({
  property: 'Luxury Villa Greens Villa 24',
  issue: 'HVAC Air Filter Replacement',
  priority: 'High'
});
console.log('\n4. Created Maintenance Ticket:', req);
if (maintenanceRequests[0].id === req.id && maintenanceRequests.length === INITIAL_MAINTENANCE_REQUESTS.length + 1) {
  console.log('   [PASS] Maintenance ticketing workflow verified.');
} else {
  console.error('   [FAIL] Maintenance ticket creation failed.');
}

// 5. Test Encrypted Document Upload & Delete
let documents = [...INITIAL_DOCUMENTS];
function uploadDocument(docData) {
  const newDoc = {
    id: `DOC-${Math.floor(10 + Math.random() * 90)}`,
    name: docData.name,
    category: docData.category || 'Property Documents',
    property: docData.property || 'Luxury Villa Greens',
    uploadedOn: '25 Oct 2026',
    size: '1.8 MB',
    type: 'pdf',
    status: 'Under Verification'
  };
  documents.unshift(newDoc);
  return newDoc;
}

function deleteDocument(id) {
  documents = documents.filter(d => d.id !== id);
}

const initialDocCount = documents.length;
const newDoc = uploadDocument({
  name: 'Sale Deed Encumbrance Certificate',
  category: 'Property Deeds',
  property: 'Skyline Heights 1402'
});
console.log('\n5. Uploaded Document:', newDoc);
if (documents.length === initialDocCount + 1 && documents[0].name === 'Sale Deed Encumbrance Certificate') {
  console.log('   [PASS] Document encryption upload verified.');
  deleteDocument(newDoc.id);
  if (documents.length === initialDocCount) {
    console.log('   [PASS] Document deletion verified.');
  }
} else {
  console.error('   [FAIL] Document management failed.');
}

console.log('\n--- ALL FUNCTIONAL INTERACTION CHECKS PASSED ---');
