import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Objects;

public class SQLiteDBM extends DBM {
    private static final String JDBC_SQLITE = "jdbc:sqlite:";
    private final String dbName;

    public SQLiteDBM(String dbName) {
        this.dbName = dbName;
    }

    @Override
    protected Connection getConnection() throws SQLException {
        return DriverManager.getConnection(JDBC_SQLITE + Objects.requireNonNull(Thread.currentThread().getContextClassLoader().getResource(dbName)).getPath());
    }
}
