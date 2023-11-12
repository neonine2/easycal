// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={ScaffoldLayout} title="CalendarEvents" titleTo="calendarEvents" buttonLabel="New CalendarEvent" buttonTo="newCalendarEvent">
        <Route path="/calendar-events/new" page={CalendarEventNewCalendarEventPage} name="newCalendarEvent" />
        <Route path="/calendar-events/{id:Int}/edit" page={CalendarEventEditCalendarEventPage} name="editCalendarEvent" />
        <Route path="/calendar-events/{id:Int}" page={CalendarEventCalendarEventPage} name="calendarEvent" />
        <Route path="/calendar-events" page={CalendarEventCalendarEventsPage} name="calendarEvents" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Users" titleTo="users" buttonLabel="New User" buttonTo="newUser">
        <Route path="/users/new" page={UserNewUserPage} name="newUser" />
        <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
        <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
        <Route path="/users" page={UserUsersPage} name="users" />
      </Set>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route path="/" name="main" page={MainPage} />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
