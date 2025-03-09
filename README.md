# Inventory Management System

A modern, responsive inventory management system built with Next.js, Material-UI, and Redux Toolkit. The application features complex data handling with MUI Data Grid, offering a seamless user experience for managing SKUs, stores, and planning.

## 🚀 Features

- **SKU Management**

  - View all SKUs in a sortable and filterable data grid
  - Add, edit, and delete SKUs
  - Track pricing and cost information

- **Store Management**

  - Comprehensive store data management
  - Interactive data grid interface
  - Store performance metrics

- **Planning Module**
  - Advanced planning capabilities
  - Efficient data handling

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 15.2.1
- **UI Components**: Material-UI (MUI) v6
- **State Management**: Redux Toolkit
- **Data Grid**: MUI X-Data-Grid
- **Testing**: Jest & React Testing Library
- **Type Safety**: TypeScript
- **Styling**: Emotion

## 📦 Installation

1. Clone the repository:

```bash
git clone [repository-url]
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── skus/              # SKU management module
│   ├── stores/            # Store management module
│   ├── planning/          # Planning module
│   └── api/               # API routes
├── components/            # Reusable components
├── redux/                 # Redux store and slices
└── __tests__/            # Test files

```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## 🧪 Testing

The project uses Jest and React Testing Library for testing. Tests are located in the `__tests__` directory.



## 📈 Performance

The application uses:

- Server-side rendering with Next.js
- Efficient state management with Redux Toolkit
- Optimized data grid for handling large datasets
- Code splitting and lazy loading

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
