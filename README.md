 ## 🧠 Implementation Decisions

### Component Architecture
The application is structured using a component-driven approach.  
Layout components (AppLayout, Sidebar) are separated from page-level components to keep UI reusable and scalable as the application grows.

### Styling Strategy
Tailwind CSS was used for rapid UI development while maintaining consistency through custom theme variables.  
Common colors and spacing tokens were centralized to avoid hardcoded styles across components.

### Folder Organization
The project separates:
- layouts → application shell
- pages → route-level screens
- components → reusable UI pieces

This helps maintain clarity and makes onboarding easier for future contributors.

### Responsiveness
Instead of creating separate layouts, responsive behavior was handled using Tailwind breakpoints.  
The authentication page switches from split layout (desktop) to stacked layout (mobile) for better usability.

### Performance Considerations
- Components kept small and reusable
- Minimal prop drilling
- Clean layout hierarchy to avoid unnecessary re-renders

### Scalability
The structure allows easy addition of:
- protected routes
- API integration
- global state management (Context/Redux) if required later
