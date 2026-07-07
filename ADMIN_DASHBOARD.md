# Admin Dashboard Documentation

## Overview
The complete admin dashboard has been implemented with full CRUD (Create, Read, Update, Delete) functionality for all LMS resources as defined in the Postman collection.

## Features

### ✅ Complete Resource Management
- **Users** - Manage user accounts (create, edit, delete)
- **Groups** - Create and manage user groups with permissions
- **Courses** - Create and manage courses
- **Videos** - Upload and manage course videos
- **Enrollments** - Manage student enrollments
- **Grades** - Create and manage student grades
- **Quizzes** - Create and manage quizzes
- **Achievements** - Create and manage achievement badges

### 🎨 Design Integration
- Seamlessly integrates with existing KidQuest design
- Consistent styling using Tailwind CSS with KidQuest color palette
- Responsive layout (desktop and mobile optimized)
- Same component library and spacing as main app

### 🔧 Components

#### Admin Components
Located in `components/admin/`:

1. **AdminTable.tsx**
   - Generic sortable data table
   - Built-in Edit/Delete actions
   - Loading states
   - Add New button
   - Responsive design

2. **AdminModal.tsx**
   - Reusable modal for forms
   - Smooth animations
   - Close button and cancel action
   - Loading indicator on submit

3. **AdminForm.tsx**
   - Generic form builder
   - Supports multiple input types:
     - Text inputs
     - Email inputs
     - Password inputs
     - Number inputs
     - Textarea
     - Select dropdowns
     - Checkboxes
   - Required field validation
   - Real-time field changes

#### Admin API Module
Located in `lib/api/admin.ts`:
- Centralized API calls for all admin operations
- Organized by resource type
- Full CRUD methods for each resource

## Directory Structure

```
app/admin/
├── layout.tsx                 # Admin layout wrapper
├── page.tsx                   # Admin dashboard overview
├── users/
│   └── page.tsx              # Users management
├── groups/
│   └── page.tsx              # Groups management
├── courses/
│   └── page.tsx              # Courses management
├── videos/
│   └── page.tsx              # Videos management
├── enrollments/
│   └── page.tsx              # Enrollments management
├── grades/
│   └── page.tsx              # Grades management
├── quizzes/
│   └── page.tsx              # Quizzes management
└── achievements/
    └── page.tsx              # Achievements management

components/admin/
├── AdminTable.tsx            # Reusable table component
├── AdminModal.tsx            # Reusable modal component
└── AdminForm.tsx             # Reusable form component

lib/api/
└── admin.ts                  # Admin API helper functions
```

## Navigation

### Updated Sidebar
- The sidebar now detects admin routes (`/admin`)
- Shows admin-specific navigation menu
- Admin icon (⚙️) in header when on admin pages
- Maintains user navigation for non-admin routes

### Admin Dashboard Stats
The main admin page (`/admin`) displays:
- Total users count
- Total groups count
- Total courses count
- Total videos count
- Total enrollments count
- Total grades count
- Total quizzes count
- Total achievements count

## API Integration

All admin operations use the existing API helper in `lib/api/admin.ts`:

```typescript
// Example usage
import { adminApi } from '@/lib/api/admin';

// Get all resources
const users = await adminApi.getUsers();

// Get single resource
const user = await adminApi.getUser(1);

// Create resource
const newUser = await adminApi.createUser(userData);

// Update resource
const updated = await adminApi.updateUser(1, updatedData);

// Delete resource
await adminApi.deleteUser(1);
```

## UI/UX Features

### Table Features
- ✅ Sortable columns (click column header)
- ✅ Sort indicators (chevron up/down)
- ✅ Edit button (pencil icon)
- ✅ Delete button (trash icon)
- ✅ Add New button (plus icon)
- ✅ Empty state message
- ✅ Loading spinner

### Form Features
- ✅ Required field indicators (red asterisk)
- ✅ Type-specific inputs
- ✅ Placeholder text
- ✅ Focus states with coral ring
- ✅ Multi-line textarea support
- ✅ Select dropdowns with options

### Modal Features
- ✅ Backdrop blur effect
- ✅ Smooth animations
- ✅ Sticky header with close button
- ✅ Scrollable content for long forms
- ✅ Action buttons (Cancel/Save)
- ✅ Loading state on submit

### Delete Confirmation
- ✅ Confirmation dialog
- ✅ Resource name display
- ✅ Cancel and Delete buttons
- ✅ Prevents accidental deletion

## Color Scheme

The admin dashboard uses the KidQuest color palette:
- Primary: `coral` (#FF6B5B)
- Secondary: `berry` (#D84B93)
- Background: `cream` (#FFF8F5)
- Text: `ink` (#2D2D3C)
- Borders: `creamdeep` (#F5DFD3)

## Responsive Design

- **Desktop (md+)**: Full sidebar + table layout
- **Tablet**: Optimized spacing and padding
- **Mobile**: Mobile nav support, scrollable tables

## Error Handling

Each page includes:
- Try-catch blocks for API calls
- Console error logging
- User-friendly error messages
- Loading states during operations
- Failed operation alerts

## Future Enhancements

Potential additions:
- Bulk operations (select multiple items)
- Advanced filtering and search
- Export to CSV/Excel
- Batch import
- Role-based access control (RBAC)
- Activity logs
- Advanced analytics
- Resource relationships view

## Getting Started

1. Navigate to `/admin` to access the dashboard
2. Click on any resource in the overview cards
3. Use the "Add New" button to create resources
4. Click the edit icon to modify resources
5. Click the delete icon to remove resources
6. Confirm deletions in the confirmation dialog

## Notes

- All operations are API-driven
- Error handling ensures graceful failures
- Loading states prevent user confusion
- Responsive design works on all devices
- Design maintains consistency with main app
