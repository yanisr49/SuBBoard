package alou.security;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class LoginController {

    @PostMapping("/login")
    public ResponseEntity<String> login(Test test, HttpServletResponse response) {
        Cookie jwtTokenCookie = new Cookie("user-id", "c2FtLnNtaXRoQGV4YW1wbGUuY29t");

        jwtTokenCookie.setMaxAge(86400);
        jwtTokenCookie.setSecure(true);
        jwtTokenCookie.setHttpOnly(true);
        jwtTokenCookie.setPath("/user/");
        jwtTokenCookie.setDomain("example.com");

        response.addCookie(jwtTokenCookie);

        ResponseCookie resCookie = ResponseCookie.from("user-id", "c2FtLnNtaXRoQGV4YW1wbGUuY29t")
                .httpOnly(true)
                .sameSite("None")
                .secure(true)
                .path("/")
                .maxAge(Math.toIntExact(1000000000))
                .build();

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, resCookie.toString()).body("yoyoyoyo");
    }
}

record Test(String clientId, String client_id, String credential, String g_crsf_token) {
}
