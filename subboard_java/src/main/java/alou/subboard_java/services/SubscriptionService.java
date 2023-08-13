package alou.subboard_java.services;

import alou.subboard_java.dtos.Subscription;
import alou.subboard_java.entities.SubscriptionEntity;
import alou.subboard_java.mapping.SubboardMapper;
import alou.subboard_java.repositories.SubscriptionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;

    private final SubboardMapper subboardMapper;

    public SubscriptionService(SubscriptionRepository subscriptionRepository, SubboardMapper subboardMapper) {
        this.subscriptionRepository = subscriptionRepository;
        this.subboardMapper = subboardMapper;
    }

    /**
     * Fetch all {@link alou.subboard_java.entities.SubscriptionEntity} of the connected {@link alou.subboard_java.entities.UserEntity}.
     *
     * @return List of {@link alou.subboard_java.entities.SubscriptionEntity}
     */
    public List<Subscription> getAllSubscriptions(Long userId) {

        List<SubscriptionEntity> subscriptionEntities = subscriptionRepository.findAllByUserId(userId);

        return subscriptionEntities.stream().map(subboardMapper::toSubscriptionDto).toList();
    }

    public Subscription createSubsciption(Subscription subscription) {

        SubscriptionEntity subscriptionEntity = subboardMapper.toSubscriptionEntity(subscription);

        subscriptionRepository.save(subscriptionEntity);

        return subboardMapper.toSubscriptionDto(subscriptionEntity);
    }

}
