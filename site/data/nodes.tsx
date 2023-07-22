export default {
    nodes: [
        // Creative
        {
            "id": "1",
            "name": "Click me",
            "text": "The Gazelle",
            "title": "The Gazelle Web Chief",
            "description": "As the Senior Web Chief of [The Gazelle](https://thegazelle.org), the student-led newspaper at NYU Abu Dhabi, I lead an ongoing website overhaul, with an ambitious team of Computer Science undergraduates, rewriting The Gazelle's digital platform, upgrading our entire technology stack.\n\nMy role involves not only leadership, but also mentorship. I am committed to developing our team's skills in cutting-edge technologies, such as React, TypeScript, and SQL, to empower effective and efficient web development. Under my guidance, we have already a 90% reduction in our infrastructure costs and a 20x increase in our full page load speed.\n\nThese improvements have significantly enhanced our readers' experience and set a new standard in the field of online journalism.",
            "val": 10
        },
        {
            "id": "2",
            "name": "Click me",
            "text": "Louvre Abu Dhabi",
            "title": "My Project at the Louvre",
            "description": "Enim ad duis sunt do in laboris elit nisi eu ipsum. Est dolore laborum pariatur est laboris veniam. Ea veniam incididunt irure velit excepteur veniam ut cillum minim adipisicing commodo sunt. Incididunt consequat culpa irure laboris nostrud excepteur do.",
            "val": 5
        },
        // Cybersecurity
        {
            "id": "3",
            "name": "Click me",
            "text": "Bluetooth Hacking",
            "title": "Bluetooth Cybersecurity Research",
            "description": "Enim ad duis sunt do in laboris elit nisi eu ipsum. Est dolore laborum pariatur est laboris veniam. Ea veniam incididunt irure velit excepteur veniam ut cillum minim adipisicing commodo sunt. Incididunt consequat culpa irure laboris nostrud excepteur do.",
            "val": 4
        },
        {
            "id": "4",
            "name": "Click me",
            "text": "Container Hacking",
            "title": "Container Security Research",
            "description": "Enim ad duis sunt do in laboris elit nisi eu ipsum. Est dolore laborum pariatur est laboris veniam. Ea veniam incididunt irure velit excepteur veniam ut cillum minim adipisicing commodo sunt. Incididunt consequat culpa irure laboris nostrud excepteur do.",
            "val": 7
        },
        {
            "id": "5",
            "name": "Click me",
            "text": "Copilot Hacking",
            "title": "GitHub Copilot Security Research",
            "description": "Enim ad duis sunt do in laboris elit nisi eu ipsum. Est dolore laborum pariatur est laboris veniam. Ea veniam incididunt irure velit excepteur veniam ut cillum minim adipisicing commodo sunt. Incididunt consequat culpa irure laboris nostrud excepteur do.",
            "val": 10
        },
        // SWE
        {
            "id": "6",
            "name": "Click me",
            "text": "Facial Recognition",
            "title": "Projects with Facial Recognition",
            "description": "Enim ad duis sunt do in laboris elit nisi eu ipsum. Est dolore laborum pariatur est laboris veniam. Ea veniam incididunt irure velit excepteur veniam ut cillum minim adipisicing commodo sunt. Incididunt consequat culpa irure laboris nostrud excepteur do.",
            "val": 10
        },
        // Blockchain
        {
            "id": "7",
            "name": "Click me",
            "text": "Smart Contracts",
            "title": "Smart Contract Development",
            "description": "Enim ad duis sunt do in laboris elit nisi eu ipsum. Est dolore laborum pariatur est laboris veniam. Ea veniam incididunt irure velit excepteur veniam ut cillum minim adipisicing commodo sunt. Incididunt consequat culpa irure laboris nostrud excepteur do.",
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