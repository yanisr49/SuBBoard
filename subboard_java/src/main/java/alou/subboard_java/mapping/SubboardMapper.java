package alou.subboard_java.mapping;

import alou.subboard_java.dtos.Subscription;
import alou.subboard_java.dtos.User;
import alou.subboard_java.entities.SubscriptionEntity;
import alou.subboard_java.entities.UserEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SubboardMapper {

    User toUserDto(UserEntity user);

    Subscription toSubscriptionDto(SubscriptionEntity subscription);

    SubscriptionEntity toSubscriptionEntity(Subscription subscription);

}
