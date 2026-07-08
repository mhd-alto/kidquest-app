# Admin home - Quick Start Guide

## 🚀 Accessing the Admin home

1. **Login to your account** with admin credentials
2. **Navigate to `/admin`** in your browser
3. You should see the Admin home overview with stats

## 📊 home Overview

The main admin home displays:
- Total count of each resource type
- Quick links to each management section
- Resource icons for easy visual identification

## 🎯 Common Tasks

### Adding a New Resource

1. Click on the resource type card (Users, Courses, etc.)
2. Click the **"Add New"** button (top right, coral color)
3. Fill in the required fields in the modal form
4. Click **"Save"** to create the resource

### Editing a Resource

1. Find the resource in the table
2. Click the **pencil icon** (Edit) in the Actions column
3. Update the fields you want to change
4. Click **"Save"** to save changes

### Deleting a Resource

1. Find the resource in the table
2. Click the **trash icon** (Delete) in the Actions column
3. A confirmation dialog will appear
4. Click **"Delete"** to confirm deletion

### Sorting Table Data

- Click any column header to sort by that column
- Click again to reverse sort order
- A chevron icon (↑/↓) shows the current sort

## 📚 Resource Management Guides

### Users Management
- **Create**: Add username, email, password
- **Edit**: Modify username or email
- **Delete**: Remove user account
- Located at `/admin/users`

### Groups Management
- **Create**: Add group name and description
- **Edit**: Update group details
- **Delete**: Remove group
- Located at `/admin/groups`

### Courses Management
- **Create**: Add course title, description, instructor
- **Edit**: Modify course details
- **Delete**: Remove course
- Located at `/admin/courses`

### Videos Management
- **Create**: Add course ID, title, URL, duration
- **Edit**: Update video details
- **Delete**: Remove video
- Located at `/admin/videos`

### Enrollments Management
- **Create**: Add user ID, course ID, status
- **Edit**: Update enrollment status
- **Delete**: Remove enrollment
- Located at `/admin/enrollments`

### Grades Management
- **Create**: Add enrollment ID, score, letter grade, feedback
- **Edit**: Modify grade details
- **Delete**: Remove grade
- Located at `/admin/grades`

### Quizzes Management
- **Create**: Add course ID, title, time limit, passing score
- **Edit**: Update quiz details
- **Delete**: Remove quiz
- Located at `/admin/quizzes`

### Achievements Management
- **Create**: Add name, description, icon, requirement
- **Edit**: Modify achievement details
- **Delete**: Remove achievement
- Located at `/admin/achievements`

## 🔍 Tips & Tricks

### Search & Filter
- Use your browser's find function (Ctrl+F / Cmd+F) to search table
- Click column headers to sort results

### Bulk Operations
- Edit one resource at a time
- Delete with confirmation to prevent accidents

### Navigation
- Use the sidebar to navigate between resources
- The admin menu shows which section you're in (highlighted in coral)

## ⚠️ Important Notes

- **Always confirm deletions** - deleted items cannot be recovered
- **Required fields** are marked with a red asterisk (*)
- **Validation** ensures data integrity before saving
- **All operations** are saved to the backend API

## 🆘 Troubleshooting

### Form won't submit
- Check all required fields are filled (marked with *)
- Ensure email is in valid format
- Check number fields have numeric values

### No data appears
- Click "Add New" to create your first resource
- Refresh the page to reload data
- Check browser console for errors

### Changes not saving
- Ensure you click the "Save" button
- Check your internet connection
- Verify API is running and accessible

## 🎨 Design Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Loading States**: Spinners show during data operations
- **Error Handling**: Clear messages for failed operations
- **Smooth Animations**: Modal and transition effects
- **Accessibility**: Keyboard navigation support

## 📱 Mobile Access

The admin home is mobile-responsive:
- Tables are scrollable horizontally
- Forms stack vertically
- Buttons are large enough for touch
- Mobile nav appears on small screens

## 🔐 Security Notes

- Always logout when finished
- Don't share your admin credentials
- Be careful with bulk operations
- Review changes before confirming

## 🚀 Performance Tips

- Use sorting to find items quickly
- Delete unused resources to keep lists manageable
- Refresh page if data seems stale
- Use specific searches when possible

---

**Need more help?** Check the [Admin home Documentation](./ADMIN_home.md) for detailed information about components, API integration, and advanced features.
