---
theme: the-unnamed
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://cover.sli.dev
title: The Semantic Web, was it just a dream ?
info: |
  ## What was the intention behind the Semantic Web
  And what it ended up being.

  Learn more at [smhb.me](https://smmhb.me)
class: text-center
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
---

# THE SEMANTIC WEB WHAT'S THAT?

It was the next big thing around the early days of web 2.0

But before we talk about it we need to...

<sub absolute text-xs bottom-8 left-16> - Text enclosed between %%% is personal opinion, feel free to discard it.</sub>
<sub absolute text-xs bottom-4 left-16> - This is a WIP, first made for a mixed audience of devs and non devs</sub>

---

# 1. REFRESH OUR MEMORIES WITH A GLOSSARY

- The internet: is a huge network, just the fact that there are a lot of computers connected to eachother.

- Hypertext: text in a document that has an embedded reference to (another document | part of the document | another resource of other type ) i.e. **links**  
  e.g. [www.example.com](https://www.example.com)

- The web: An "application" layer that uses the internet to share documents (webpages, PDFs, Bare text, images).

---

# 2. ACCEPT THAT THE WEB IS CONSTANTLY CHANGING

- Constant change doesn't imply constant rate of that change, %%% it's probably going to change even faster in the future %%%

- The changes are usually stacked on top of each other and surprisingly backwards compatible.

- %%% And it's not only from a technological point of view, but from a behavioral one too.
  People's trust in the web's information, processes, providers, and services is shifting. %%%

Now to order to anticipate the future, let's look into the past trends.

---

```yaml
class: text-white
```

# 2.1. THE OLD WORLD WIDE (WILD) WEB

### %%% INSPIRATION FROM RESEARCH PAPER REFERENCES %%%

While reading a reseach paper you might find numbered references to the paper's sources, these usually look like :

> Birds are not real, as demonstrated by Mithos Z et al.$^{3}$ in their their research about birds. Thus, for our intents and purposes we can conclude that...  
> &nbsp;  
> $^{3}$ Mithos Z, et al, (1984) A statistical model of the probality of non existence of birds. Nature

&nbsp;

- In 1989 The web was invented to share interactive documents between researchers that facilitate access to referenced resources using hyperlinks.

---

# And it looked like this on the **Line Mode Browser** ⬇️

<LineBrowserEmulator/>

---

# THE ORIGINAL TECH STACK OF WEB 1.0

Web 1.0, also known as the Static Web, was the first stage of the World Wide Web's evolution.

**It was highly inspired off print media.** It was characterized by simple, static web pages with limited interactivity and functionality. The key components of the Web 1.0 tech stack included:

- **Web Servers**  
  ⬇️*HTML* via HTTP (HyperText Transfer Protocol)
- **Web Browsers**  
  ⬇️*Rendering*
- **User**

---

# 2.2. THE RISE OF WEB 2.0

Further improvements on Web 1.0 and later Web 2.0 brought user-generated content, usability, and interoperability for end users. It marked a shift from static web pages to dynamic and shareable content.

- Graphical Content
- User Generated Content
- Personal websites became popular
- Browser Scripts

But it was <u>still</u> built on the old foundations that go back to the print days.

---

# WHAT ARE SEMANTICS?

**<u>Language</u>** is a communication protocol of \[data mixed with ideas\] transfer between humans.  
Just like tech data transfer protocols, it has data formats, address formats, routing, detection of transmission errors, flow control, etcetera etcetera...

Tech data protocols were inspired by human language.

**<u>Semantics</u>** is the study of meaning, ideas, and concepts in language, as opposed to **Syntax** which studies grammar rules and other language building blocks but doesn't care about meaning.

That's why we can produce gramatically correct phrases (or code) that have no real meaning, that convey no information.  
And we have the ability to sometimes understand the communicated ideas even when the syntax is wrong.

As humans, since the two usually go together, we sometimes confuse them. Cue the person in a closed box thought experiment ⬇️

---

# THE CHINESE ROOM ARGUMENT AND THOUGHT EXPERIMENT

Let's assume there's a person that only speaks english in a room, and in an adjacent room, and a computer that reads and generates chinese phrases fluently; they can only communicate using letters passed below the door.

The letters are only written in chinese.

The english speaker has a very big exhaustive rule book on how to draw the Hànzì characters to respond to any possible message from the chinese speaking computer without needing to understand a thing.

To the person, they're communicating with another person.
To the computer, the person on the other room understands chinese.
But one can argue that the their level of understanding is the same, enough to generate language but not structured meaningful ideas.

---

# 3. THE SEMANTIC WEB VISION

In order to make the machine have a higher understanding of the data it uses, the Semantic Web idea was introduced.

It envisioned a web where data would be more structured, helping with its visualisation, sharing and reuse, and most importantly the automation of actions on that data.

- Ontologies and metadata standards were developed.
- OWL (Web Ontology Language), RDF (Resource Description Framework) and other languages/formats were introduced.

---

# 4.1 SOME EXAMPLES

## Ontology Example

An ontology defines the relationships between different concepts. Here is a simple ontology for "Bujayr the Bedouin" and "Cecil the Camel":

- **Bujayr the Bedouin**

  - **Owns**: Cecil the Camel
  - **Lives In**: Desert
  - **Occupation**: Nomad Shepherd

- **Cecil the Camel**
  - **Type**: Animal
  - **Habitat**: Desert
  - **Used For**: Transportation

---

## RDF EXAMPLE

So instead of sending an HTML or any other non-semantic document, you would send something in one of the semantic formats that will allow the machine to "understand" the information. The recieving software will take care of rendering the objects, their relations, and handle their actions if it's a human's end client, or do some action on it like saving or transforming if it's a automatic service.

RDF-XML (Resource Description Framework) is used to represent information about resources in the web. Here is an RDF example for "Bedouin" and "Cecil the Camel":

```xml {1-3|5-17|all}{maxHeight:'300px', lines: true}
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
     xmlns:foaf="http://xmlns.com/foaf/0.1/"
     xmlns:ex="http://example.org/">

  <rdf:Description rdf:about="http://example.org/Bujayr_the_Bedouin">
    <foaf:name>Bujayr the Bedouin</foaf:name>
    <ex:owns rdf:resource="http://example.org/Cecil_the_Camel"/>
    <ex:livesIn rdf:resource="http://example.org/Desert"/>
    <ex:occupation>Nomad Shepherd</ex:occupation>
  </rdf:Description>

  <rdf:Description rdf:about="http://example.org/Cecil_the_Camel">
    <foaf:name>Cecil the Camel</foaf:name>
    <ex:type rdf:resource="http://example2.org/Animal"/>
    <ex:habitat rdf:resource="http://example.org/Desert"/>
    <ex:usedFor rdf:resource="http://example.org/Transportation"/>
  </rdf:Description>
</rdf:RDF>
```

---

## COMPUTERS EASILY UNDERSTAND XML, LET'S PLAY WITH IT

<RdfXmlToCanvas/>

---

# 5. CHALLENGES AND CRITICISMS

Despite its potential, and its adoption by the W3C the Semantic Web faced several challenges that prevented a wide adoption:

- Complexity in creating and maintaining ontologies.
- Complexity of creating backwards compatible software if we switched to that model.
- The client and editing software had terrible UX, and was too esoteric.
- Scalability issues with large datasets.
- XML was its face, and people hate XML.
- No real incentive to use it except some rare cases.
- Hard to agree on universal schemas.
  - When we try to have universal schema (One schema might want to implement all technical and real world senses of a principle and ends up sucking at both ) [see schema.org/Action](https://pending.schema.org/Action)

---

# 6. CURRENT STATE AND FUTURE PROSPECTS

While the full vision of the Semantic Web has not been realized, the tools and standards are still used and worked on.

Its principles have influenced many modern technologies.

<h2 v-click>Can you guess which ones?</h2> 
    
<ul class="text-xl pt-4">
  <li v-click>Linked Data (e.g. the JSON-LD we put in our headers) and Open Data initiatives.</li>  
  <li v-click>Knowledge graphs used by search engines.</li>  
  <li v-click>AI and machine learning applications.</li>  
  <li v-click>More, and more to come</li>
</ul>

---

# CONCLUSION

- Structured and meaningful data is an important way of communication in a binary world, even when Machine Learning algorithms "can understand" unstructured text.

%%%

- The Semantic Web's vision of a more interconnected and machine-readable web will probably continue.

- (Dreams of grandeur warning) If I were to redesign the web ecosystem I would make web services more like Semantic APIs and leave the visual structuring, styling, and rendering to the client. Basically smarter RSS feeds.

- I believe there will be more push in this direction.
  %%%

---

## Read more:

- https://www.w3.org/TR/?filter-tr-name=semantic
- https://www.w3.org/TR/?filter-tr-name=RDF

<h2 v-click>Thank you all, godspeed and farewell ! ♥️ ♥️ ♥️ </h2>
