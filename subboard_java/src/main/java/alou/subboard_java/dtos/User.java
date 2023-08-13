package alou.subboard_java.dtos;

import org.springframework.lang.NonNull;

public record User(
        @NonNull Long id,
        @NonNull String email,
        String pseudo,
        String theme,
        String profilPicture
) {
}
