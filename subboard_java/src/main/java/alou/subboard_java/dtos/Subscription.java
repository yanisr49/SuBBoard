package alou.subboard_java.dtos;

import org.springframework.lang.NonNull;

public record Subscription(
        @NonNull Long id,
        @NonNull String name,
        String color,
        String logo
) {
}
