package alou.subboard_java.controller;

import alou.subboard_java.GraphQlConfiguration;
import alou.subboard_java.commons.UserUtils;
import alou.subboard_java.dtos.Subscription;
import alou.subboard_java.dtos.User;
import alou.subboard_java.services.SubscriptionService;
import alou.subboard_java.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.graphql.data.method.annotation.Arguments;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(GraphQlConfiguration.class);

    private final SubscriptionService subscriptionService;
    private final UserService userService;

    public UserController(SubscriptionService subscriptionService, UserService userService) {
        this.subscriptionService = subscriptionService;
        this.userService = userService;
    }

    @QueryMapping
    public User user() {
        return userService.getCurrentUser();
    }

    @SchemaMapping
    public List<Subscription> subscriptions(User user) {
        return subscriptionService.getAllSubscriptions(user.id());
    }

    @QueryMapping
    public List<Subscription> subscriptions() {
        Long userId = UserUtils.getConnectedUserId();

        return subscriptionService.getAllSubscriptions(userId);
    }

    @MutationMapping
    public Subscription createSubscription(@Arguments Subscription subscription) {
        return subscriptionService.createSubsciption(subscription);
    }

}
