DMS:

Its the DMS UI, it is buit using React with Redux.

The main features are:

1. Authentication: Login, LogOut, SignUp and Password Reset
2. File upload: Upload file with name, description and expiry date.
3. Folder: Can create folder iniside myfiles and inside a department and will be able to navigate to the folders and again we can add files and folders in a nested way.
4. Department: Role based departments where users with permission can access the department and the files iniside it. Users can add files and folder inside the department same as myfiles but only the users who are members of the department can access the files inside the department.
5. File Category : Files can be grouped to categories and it can be viewd under categories section. The category can be assigned to a file while uploading and editing.
6. File Metadata: Metadata can be assigned to files along with name and category.
7. File Details: On clicking a filde a details page will open where the file properties like name, category, metadata can be available. These details can be edited from this page.
8. Checkout: Checkout and checkin of files to prevent over-writing of files. It will be available only on department container. On right click over files a context menu will open where checkout option is available for a file and if we choose the checkout option a lock icon will appear over the file to show that the file is checked out and it will be disabled for other users. On right clicking the file the context menu will have checkin option now.
9. Revision history: File revision history with updated time and updated user. It is shown in the file details page.
10. File expiration: File expiration date can be set while uploading a file. The file won't be visible to in the system after expiry.
11. Delete and edit: These created resources can be deleted as well. The delete option for department is provided in the list table and for files and folders the delete and edit option is available in the context menu.
