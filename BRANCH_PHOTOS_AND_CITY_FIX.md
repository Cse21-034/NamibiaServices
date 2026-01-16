# Fixes Applied

## ✅ Fix 1: Branches Now Inherit Parent's Photos

**Changes Made:**
- When creating a branch, the system now automatically copies all photos from the parent business
- Branches will show the same company logo and images as the main office
- This happens automatically - no manual photo upload needed for branches

**Code Changes:**
```typescript
// After creating branch, copy parent photos
if (parentBusiness.photos && parentBusiness.photos.length > 0) {
    await prisma.businessPhoto.createMany({
        data: parentBusiness.photos.map(photo => ({
            url: photo.url,
            businessId: branch.id,
            isPrimary: photo.isPrimary,
            caption: photo.caption
        }))
    });
}
```

## ⚠️ Issue 2: Main Office Showing in Gaborone Search

**Problem:**
The main office "Cheza Pharmacy" is appearing in "Gaborone" location searches even though its address is "Lecha ward, Gulubane, Botswana".

**Root Cause:**
The main office's `city` field is set to "Gaborone" instead of the correct city where Gulubane is located.

**Solution - Update Main Office City:**

### Option 1: Via Business Dashboard UI
1. Go to Business Dashboard → Profile tab
2. Find the "City" field
3. Change from "Gaborone" to the correct city (e.g., "Gulubane" or whichever city/town Gulubane is actually in)
4. Save changes

### Option 2: Via SQL Query
Run this query to check what city is currently set:

```sql
SELECT id, name, city, address, isBranch, branchName 
FROM "Business" 
WHERE name LIKE '%Cheza%';
```

Then update it:

```sql
UPDATE "Business" 
SET city = 'Gulubane'  -- Replace with correct city
WHERE name = 'Cheza Pharmacy' 
  AND isBranch = false;
```

## How Location Search Works

The search looks for businesses where:
- `city` contains the search term OR
- `address` contains the search term

Currently:
- Main office: `city = "Gaborone"` (WRONG!) + `address = "Lecha ward, Gulubane, Botswana"`
- Gaborone Branch: `city = "Gaborone"` (CORRECT!) + `address = "6430 broadhurst"`

When searching "pharmacy in Gaborone":
- ✅ Gaborone Branch matches (city = Gaborone)
- ❌ Main office SHOULDN'T match (but does because city = Gaborone)

## Next Steps

1. **Delete and recreate the MainMall Branch** (so it gets the parent's photos)
2. **Update the main office city** to the correct location (not Gaborone)
3. **Test the search again:**
   - Search "pharmacy in Gaborone" → Should show ONLY the Gaborone branch
   - Search "pharmacy in Gulubane" → Should show ONLY the main office
   - The branch will now show the same photos/logo as the main office
