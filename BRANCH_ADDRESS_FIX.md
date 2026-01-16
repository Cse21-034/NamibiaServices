# Branch Creation - Address Requirements

## Changes Made

### 1. API Validation (`src/app/api/business/branches/route.ts`)
- ✅ **Address is now REQUIRED** when creating a branch
- ✅ Added validation to ensure address is not empty
- ✅ Clear error messages guide users to provide unique branch addresses

### 2. UI Form (`src/app/business/branches/page.tsx`)
- ✅ Address field now marked as **required** (`*`)
- ✅ Added helpful description explaining the need for unique addresses
- ✅ Updated placeholder text with better example
- ✅ Form will not submit without an address

## What This Fixes

**Before:**
- Branches could be created without an address
- Default behavior was `address || ''` (empty string)
- Branches showed parent's address or empty address
- Search results were confusing (wrong location)

**After:**
- Every branch **must have** a unique address
- API rejects branch creation if address is missing or empty
- Clear user guidance in the form
- Search results will show correct branch-specific addresses

## Instructions for User

1. **Delete the existing Gaborone branch** (it has wrong address)
2. **Create a new branch** with these steps:
   - Click "Add Branch"
   - Fill in:
     - Branch Name: `Gaborone Branch`
     - City: `Gaborone`
     - **Address:** `Plot 123, Main Mall, Gaborone` ← **REQUIRED!**
     - Phone: Branch-specific number
     - Email: Branch-specific email
   - Click "Add Branch"

3. **Search for "pharmacy in Gaborone"**
   - ✅ Should now show "Cheza Pharmacy - Gaborone Branch"
   - ✅ Should show the Gaborone address (Plot 123, Main Mall, Gaborone)
   - ✅ Location-based search will work correctly

## Technical Details

### API Endpoint Changes
```typescript
// Validation now checks for address
if (!parentBusinessId || !branchName || !city || !address) {
    return "address is required..."
}

// Empty string check
if (address.trim() === '') {
    return "Branch address cannot be empty..."
}

// Uses the provided address (required)
address: address.trim(),  // No more fallback to ''
```

### UI Form Changes
```tsx
<label>Branch Address *</label>  {/* Added asterisk */}
<p>Provide the specific address for this branch...</p>  {/* Guidance */}
<Input
    required  {/* HTML5 validation */}
    placeholder="Plot 123, Main Mall, Building 45"
/>
```

## Next Steps

After creating the new branch with proper address:
- Branch searches by location will work
- Branch display will show correct address
- Future branches will be forced to have unique addresses
