# tp-management-app Backend README

# TP Management Application Backend

This is the backend for the TP Management Application, built using Spring Boot. The application provides RESTful APIs for managing Travaux Pratiques (TP), user registrations, grades, payments, and more.

## Project Structure

- `src/main/java/com/example/tpmanagement`: Contains the main application code.
  - `controller`: Contains REST controllers for handling requests.
  - `service`: Contains service classes for business logic.
  - `model`: Contains entity classes representing the database structure.
  - `dto`: Contains Data Transfer Objects for API communication.
  - `repository`: Contains interfaces for database operations.

- `src/main/resources`: Contains configuration files and static resources.
  - `application.properties`: Configuration properties for the Spring Boot application.

- `src/test/java/com/example/tpmanagement`: Contains test classes for the application.

## Getting Started

### Prerequisites

- Java 11 or higher
- Maven

### Running the Application

1. Clone the repository:
   ```
   git clone <repository-url>
   cd tp-management-app/backend
   ```

2. Build the application:
   ```
   mvn clean install
   ```

3. Run the application:
   ```
   mvn spring-boot:run
   ```

The application will start on `http://localhost:8080`.

## API Documentation

API documentation is generated using Swagger. You can access it at `http://localhost:8080/swagger-ui.html` after starting the application.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.