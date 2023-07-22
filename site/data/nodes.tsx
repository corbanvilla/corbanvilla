export default {
    nodes: [
        // Creative
        {
            "id": "1",
            "name": "Click me",
            "text": "The Gazelle Newspaper",
            "title": "The Gazelle Web Chief",
            "description": "As the Senior Web Chief of [The Gazelle](https://thegazelle.org), the student-led newspaper at NYU Abu Dhabi, I began and continue to lead an ongoing [website overhaul](https://github.com/thegazelle-ad/gazelle-server-next), with an ambitious team of Computer Science undergraduates, rewriting The Gazelle's digital platform, upgrading our entire technology stack.\n\nMy role involves not only leadership, but also mentorship. I am committed to developing our team's skills in cutting-edge technologies, such as React, TypeScript, and SQL, to empower effective and efficient web development. Under my guidance, we have already a 90% reduction in our infrastructure costs and a 20x increase in our full page load speed.\n\nThese improvements have significantly enhanced our readers' experience and set a new standard in the field of online journalism.",
            "val": 10
        },
        {
            "id": "2",
            "name": "Click me",
            "text": "Louvre Abu Dhabi",
            "title": "What does it mean to be Human?",
            "description": "My Sophomore year of NYU, my friend Aakarsh Singh and I put together a project to challenge the new space of Artificial Intelligence (AI) in art and begin a discussion around what real art actually is.\n\nWe put together [a website](https://louvre.corbanvilla.com) which showcased a series of AI-generated images, right alongside real pieces from the Louvre Abu Dhabi.\n\nWe then [setup the exhibit in the Louvre](https://www.khaleejtimes.com/lifestyle/arts-and-culture/uae-what-does-it-mean-to-be-human-university-students-answer-through-ai-art-interactive-exhibits), and asked participants if they could pick the real piece.",
            "val": 5
        },
        // Cybersecurity
        {
            "id": "3",
            "name": "Click me",
            "text": "Bluetooth Hacking",
            "title": "Bluetooth Cybersecurity Research",
            "description": "As I began exploring Cybersecurity in highschool, Bluetooth security was a very interesting topic to me.\n\nIn 2017, I presented \"[Arm Mounted Weaponized Platform and Anime Viewer](https://youtu.be/4o9nKWI0lXM),\" at DEFCON R00tz, which performed a range of analysis on nearby Bluetooth devices.\n\nIn 2018, I presented \"[SAINTCON 2018 Presentation: From basics to vulnerabilities](https://youtu.be/fAKizRuEQOw),\" which showcased how to perform reverse-engineering on IoT bluetooth devices.",
            "val": 4
        },
        {
            "id": "4",
            "name": "Click me",
            "text": "Container Hacking",
            "title": "Container Security Research",
            "description": "In 2020, I ran a [Container Security Workshop](https://github.com/corbanvilla/saintcon-container-village) at a local security conference, [SAINTCON](https://www.saintcon.org/). The workshop covered both sides of container security, from red-teaming to blue-teaming, and challenged participants to break into live containerized applications.",
            "val": 7
        },
        {
            "id": "5",
            "name": "Click me",
            "text": "Copilot Hacking",
            "title": "GitHub Copilot Security Research",
            "description": "Details coming soon!",
            "val": 10
        },
        // SWE
        {
            "id": "6",
            "name": "Click me",
            "text": "Facial Recognition",
            "title": "Projects with Facial Recognition",
            "description": "As part of my highschool publishing team, I began experimenting with facial recognition to begin solving a continual problem: We needed a way to identify students from photos we had taken throughout the year, in order to index the student body in the yearbook.\n\nLeveraging school photos as an index, I built a [facial recognition system](https://github.com/corbanvilla/miles) which would identify students from photos sent to the program.\n\nLater, in the first year of my undergraduate program, I further developed my project to identify students through a [Microsoft Hololens](https://github.com/corbanvilla/AlHosLetMeIn).\n\nLastly, I also created a video which breaks down [how facial recognition works](https://www.youtube.com/watch?v=cOZ9emGgiaY), revealing the underlying cosine similarity algorithm for a [local technology conference](https://www.shetechexplorer.com/) for high-schoolers.",
            "val": 10
        },
        // Blockchain
        {
            "id": "7",
            "name": "Click me",
            "text": "Smart Contracts",
            "title": "Smart Contract Development",
            "description": "In 2021, I dove into the world of Blockchain and Smart Contracts, working for a startup Owl Protocol. We developed an array of [open source smart contracts](https://github.com/owlprotocol/contracts) for a no-code platform to make it easier to develop blockchain applications.\n\nAt a Blockchain Hackathon in San Francisco, I also wrote a [CBOR decoding library](https://owlprotocol.github.io/solidity-cbor/docs/quickstart) in the Smart Contract coding language Solidity, along with [full documentation](https://owlprotocol.github.io/solidity-cbor/docs/quickstart/).The team utilized this project to create [merkledb](https://github.com/owlprotocol/merkledb), a system to bridge traditional databases with the blockchain, utilizing [Merkle trees](https://en.wikipedia.org/wiki/Merkle_tree).",
            "val": 4
        },
    ],
        links: [
        // Creative
        {
            "source": "1",
            "target": "2"
        },
        // Cybersecurity
        {
            "source": "3",
            "target": "4"
        },
        {
            "source": "3",
            "target": "5"
        },
        {
            "source": "4",
            "target": "5"
        },
        // SWE -> Blockchain
        {
            "source": "6",
            "target": "7"
        },
        // SWE -> Gazelle
        {
            "source": "6",
            "target": "1"
        },
        // SWE -> Container Hacking
        {
            "source": "6",
            "target": "4"
        },
    ],
}