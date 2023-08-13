package alou.subboard_java;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@EntityScan("alou/subboard_java/entities")
@SpringBootApplication
public class SubboardBackApplication {

    public static void main(String[] args) {
        SpringApplication.run(SubboardBackApplication.class, args);
    }
}
