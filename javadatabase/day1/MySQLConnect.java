import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.Scanner;

public class MySQLConnect {
    public static void main(String[] args) {
        // Database connection details
        String url = "jdbc:mysql://localhost:3306/mydb"; // Change 'mydb' to your database name
        String user = "root";  // Change to your MySQL username
        String password = "sha2";   // Change to your MySQL password

        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter text to store in database: ");
        String inputText = scanner.nextLine();
        
        // SQL query to insert data
        String query = "INSERT INTO messages (text_content) VALUES (?)";

        try {
            // Load MySQL JDBC Driver
            Class.forName("com.mysql.cj.jdbc.Driver");
            
            // Establish connection
            Connection con = DriverManager.getConnection(url, user, password);
            PreparedStatement pstmt = con.prepareStatement(query);
            
            // Set user input into query
            pstmt.setString(1, inputText);
            
            // Execute query
            int rowsAffected = pstmt.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("Data inserted successfully!");
            }

            // Close resources
            pstmt.close();
            con.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            scanner.close();
        }
    }
}
