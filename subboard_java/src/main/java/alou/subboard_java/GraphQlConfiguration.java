package alou.subboard_java;

import graphql.scalars.ExtendedScalars;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.graphql.GraphQlSourceBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.graphql.execution.RuntimeWiringConfigurer;

@Configuration
public class GraphQlConfiguration {

    private static final Logger log = LoggerFactory.getLogger(GraphQlConfiguration.class);

    @Bean
    public RuntimeWiringConfigurer runtimeWiringConfigurer() {
        return wiringBuilder -> wiringBuilder
                .scalar(ExtendedScalars.Date)
                .scalar(ExtendedScalars.Url);
    }

    @Bean
    GraphQlSourceBuilderCustomizer inspectionCustomizer() {
        return source -> source.inspectSchemaMappings(report -> log.info(report.toString()));
    }
}
