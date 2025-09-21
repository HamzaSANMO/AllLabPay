package com.example.tpmanagement;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(properties = {
        "spring.jpa.defer-datasource-initialization=false",
        "spring.sql.init.mode=never"
})
class TpManagementApplicationTests {
    @Test
    void contextLoads() {
        // Test que le contexte se charge
        assertTrue(true);
    }
}