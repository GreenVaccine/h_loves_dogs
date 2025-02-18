# Fetch Frontend Take-Home Exercise (We love dogs🐾)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## 🔍Overview

This project is a dog adoption website built with Next.js and TypeScript. It allows users to search for shelter dogs, mark favorites, and generate matches based on their preferences. The goal was to create a seamless, user-friendly experience to help dog lovers find their perfect companion.
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**Live Demo**: [🚀](https://mysticblackmask.github.io/h-countries_weather)

## 🔑Features

- **Login Screen**: Users can enter their name and email to authenticate with the Fetch API.
- **Search Dogs**: After login, users can browse through available dogs.
- **Match Generation**: When the user finishes selecting dogs, they can generate a match by sending their selected dog IDs to the /dogs/match endpoint.

## 💼API Integration Challenges

Integrating with the provided API posed several challenges:
Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

- **Large Array Handling**: The API returns more than 100 dog entries. Handling such large arrays proved difficult, as the frontend struggled with mapping and accessing the data efficiently. This caused issues with pagination and performance when filtering/searching the dogs.

- **Inefficient API Flow**: The API's design required fetching individual dog data using the dog IDs. This made the frontend slower as it had to request multiple API calls for each dog’s detailed data. Additionally, sending a list of dog IDs to fetch their data, instead of receiving the full list at once, added unnecessary complexity and performance bottlenecks. This slow response from the backend affected the overall user experience.

## 🛠Technologies Used

- **Next.js**: Framework for building the React app.
- **TypeScript**: For type safety and better maintainability.
- **Flowbite**: Component library used for UI elements like buttons, forms, etc.
- **Redux**: For managing authentication state and dog search data.
- **Vercel**: For deploying the application.

## 📌Conclusion

While the backend API integration was challenging, particularly with large datasets and inefficient calls, the project was successfully completed. The frontend is fully functional with features such as login, dog search, favorites, and match generation. Further improvements could be made with a more efficient backend or optimizations to reduce the number of API calls.
