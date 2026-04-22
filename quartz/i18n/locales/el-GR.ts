import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "Χωρίς τίτλο",
    description: "Χωρίς περιγραφή",
  },
  components: {
    callout: {
      note: "Σημείωση",
      abstract: "Περίληψη",
      info: "Πληροφορίες",
      todo: "Εκκρεμεί",
      tip: "Συμβουλή",
      success: "Επιτυχία",
      question: "Ερώτηση",
      warning: "Προειδοποίηση",
      failure: "Αποτυχία",
      danger: "Κίνδυνος",
      bug: "Σφάλμα",
      example: "Παράδειγμα",
      quote: "Παράθεμα",
    },
    backlinks: {
      title: "Αντίστροφοι σύνδεσμοι",
      noBacklinksFound: "Δεν βρέθηκαν αντίστροφοι σύνδεσμοι",
    },
    themeToggle: {
      lightMode: "Φωτεινή λειτουργία",
      darkMode: "Σκοτεινή λειτουργία",
    },
    readerMode: {
      title: "Λειτουργία ανάγνωσης",
    },
    explorer: {
      title: "Εξερευνητής",
    },
    footer: {
      createdWith: "Δημιουργήθηκε με",
    },
    graph: {
      title: "Γραφική Προβολή",
    },
    recentNotes: {
      title: "Πρόσφατες σημειώσεις",
      seeRemainingMore: ({ remaining }) => `Δείτε ${remaining} ακόμα →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `Ενσωμάτωση: ${targetSlug}`,
      linkToOriginal: "Σύνδεσμος στο πρωτότυπο",
    },
    search: {
      title: "Αναζήτηση",
      searchBarPlaceholder: "Αναζητήστε κάτι",
    },
    tableOfContents: {
      title: "Πίνακας Περιεχομένων",
    },
    contentMeta: {
      readingTime: ({ minutes }) => `${minutes} λεπτά ανάγνωσης`,
    },
  },
  pages: {
    rss: {
      recentNotes: "Πρόσφατες σημειώσεις",
      lastFewNotes: ({ count }) => `Τελευταίες ${count} σημειώσεις`,
    },
    error: {
      title: "Δεν βρέθηκε",
      notFound: "Αυτή η σελίδα είναι ιδιωτική ή δεν υπάρχει.",
      home: "Επιστροφή στην αρχική σελίδα",
    },
    folderContent: {
      folder: "Φάκελος",
      itemsUnderFolder: ({ count }) =>
        count === 1 ? "1 στοιχείο σε αυτόν τον φάκελο." : `${count} στοιχεία σε αυτόν τον φάκελο.`,
    },
    tagContent: {
      tag: "Ετικέτα",
      tagIndex: "Ευρετήριο Ετικετών",
      itemsUnderTag: ({ count }) =>
        count === 1 ? "1 στοιχείο με αυτήν την ετικέτα." : `${count} στοιχεία με αυτήν την ετικέτα.`,
      showingFirst: ({ count }) => `Εμφάνιση πρώτων ${count} ετικετών.`,
      totalTags: ({ count }) => `Βρέθηκαν ${count} ετικέτες συνολικά.`,
    },
  },
} as const satisfies Translation
