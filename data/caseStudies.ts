import type { CaseStudy } from "@/types/case-study";

export const caseStudies: CaseStudy[] = [

  {

    slug: "industrial-knowledge-copilot",

    category: "Generative AI",

    title: "Industrial Knowledge Copilot",

    summary:

      "A production-oriented retrieval system for answering questions across industrial documentation with measurable retrieval quality and evidence-backed responses.",

    technologies: [

      "Python",

      "RAG",

      "Embeddings",

      "Vector Search",

      "Evaluation",

    ],

    architecture: [

      "Industrial documents",

      "Parsing",

      "Chunking",

      "Embeddings",

      "Vector retrieval",

      "Evaluation",

      "Grounded answer",

    ],

    sections: [

      {

        number: "01",

        title: "The problem",

        content:

          "Industrial engineers frequently need answers buried inside specifications, manuals, maintenance documents, and other technical material. Traditional search can retrieve documents, but it does not necessarily surface the precise evidence needed to answer a technical question reliably.",

      },

      {

        number: "02",

        title: "Project objective",

        content:

          "The goal is to build a retrieval-augmented AI system that can locate relevant technical evidence, provide grounded answers, and make retrieval quality measurable rather than relying on demonstrations that merely appear correct.",

      },

      {

        number: "03",

        title: "Engineering approach",

        content:

          "The system separates document processing, chunking, embedding, retrieval, evaluation, and answer generation into distinct stages. This makes individual components measurable and allows retrieval failures to be diagnosed independently from language model behavior.",

      },

      {

        number: "04",

        title: "Evaluation",

        content:

          "Retrieval is evaluated using a curated set of questions with known relevant evidence. Instead of judging the system only by whether the final answer sounds convincing, the evaluation checks whether the correct source material appears at the right rank in the retrieved results.",

      },

      {

        number: "05",

        title: "Key engineering decision",

        content:

          "Dense retrieval was introduced as a measurable baseline rather than treated as an unquestioned component. Each query can be inspected for whether the expected evidence is retrieved and at what rank, creating a foundation for comparing chunking, embedding, reranking, and hybrid-search strategies.",

      },

      {

        number: "06",

        title: "Current status",

        content:

          "The project currently includes a working dense-retrieval evaluation workflow and is being expanded toward a complete production-oriented knowledge assistant with stronger retrieval, grounded generation, evaluation, and deployment.",

      },

      {

        number: "07",

        title: "What this project demonstrates",

        content:

          "The project is designed to demonstrate more than basic RAG implementation. It focuses on retrieval quality, system decomposition, reproducible evaluation, engineering trade-offs, and the path from an AI prototype toward a dependable product.",

      },

    ],

  },

];