import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public abstract class DBM implements IDBM {
    protected abstract Connection getConnection() throws SQLException;

    @Override
    public void update(String query) throws SQLException {
        try (
                Connection connection = this.getConnection();
                Statement statement = connection.createStatement()
        ) {
            statement.executeUpdate(query);
        }
    }

    @Override
    public List<List<?>> fetch(String query) throws SQLException {
        List<List<?>> table = new ArrayList<>();
        try (
                Connection connection = this.getConnection();
                Statement statement = connection.createStatement();
                ResultSet resultSet = statement.executeQuery(query)
        ) {
            int columnCount = resultSet.getMetaData().getColumnCount();
            while (resultSet.next()) {
                List<Object> record = new ArrayList<>();
                table.add(record);
                for (int i = 1; i <= columnCount; i++) {
                    record.add(resultSet.getObject(i));
                }
            }
        }
        return table;
    }
}
