package alou.sutom;

import org.htmlunit.TextPage;
import org.htmlunit.WebClient;
import org.htmlunit.html.HtmlPage;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;

public class TEst {


    public void test() {

        try (final WebClient webClient = new WebClient()) {
            final HtmlPage instanceConfiguration = webClient.getPage("https://sutom.nocle.fr/js/instanceConfiguration.js");
            String secondHalf = instanceConfiguration.asNormalizedText().split("idPartieParDefaut = \"")[1];
            String idPartie = secondHalf.substring(0, secondHalf.indexOf("\""));
            LocalDate today = LocalDate.now();

            String DecodedPath = String.format("%s-%d-%02d-%02d",
                    idPartie,
                    today.getYear(),
                    today.getMonthValue(),
                    today.getDayOfMonth());

            String EncodedPath = new String(Base64.getEncoder().encode(DecodedPath.getBytes()));

            final TextPage wordFile = webClient.getPage(String.format("https://sutom.nocle.fr/mots/%s.txt", EncodedPath));
            String wordToFind = wordFile.getContent();

            final HtmlPage page = webClient.getPage(String.format("https://sutom.nocle.fr/js/mots/listeMotsProposables.%d.%s.js", wordToFind.length(), wordToFind.charAt(0)));
            List<String> words = new ArrayList<>(Arrays.stream(page.asNormalizedText().substring(511).split("\", \"")).toList());

            String lastWord = words.get(words.size() - 1);
            words.remove(lastWord);
            words.add(lastWord.substring(0, wordToFind.length()));


        } catch (Exception e) {
        }
    }
}
