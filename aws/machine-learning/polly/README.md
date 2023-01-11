# Table of Contents

- [Table of Contents](#table-of-contents)
- [Polly:](#polly)
- [Polly: Lexicon](#polly-lexicon)
- [Polly: SSML](#polly-ssml)

---

# Polly:

![Amazon Polly](https://d1.awsstatic.com/products/polly/Product-Page-Diagram_Amazon-Polly_Content-Creation.b08a15177fcf8c6c54ec740db898738ca8aa1e02.png)

- Turn text into lifelike speech using Deep Learning (Opposite of Transcribe)
- Allows you to create applications that talk
- **Free Tier**: Get 5 million characters free per month for 12 months

---

# Polly: Lexicon

- Customization the pronunciation of words with **Pronunciation lexicons**
  - Stylized words: St3ph4ne => "Stephane"
  - Acronyms: AWS => "Amazon Web Services"
- Upload the Lexicons and use them in the **`SynthesizeSpeech`** operation

---

# Polly: SSML

- Generate speech from Plain Text or from documents marked up with Speech Synthesis Markup Language (SSML) enabling more customization

  - Emphasizing specific words or phrases
  - Adding pauses:

    ```s
    <speak>Hi! My name is Jayanta.<break time="2s" /> I love AWS.</speak>
    ```

  - Using phonetic prounciation
  - Including breathing sounds, whispering
  - Using the Newscaster speaking style

---
