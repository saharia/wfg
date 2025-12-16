export const callDurationData = [
  { t: 0, v: 10 },
  { t: 1, v: 12 },
  { t: 2, v: 18 },
  { t: 3, v: 30 },
  { t: 4, v: 45 },
  { t: 5, v: 60 },
  { t: 6, v: 55 },
  { t: 7, v: 40 },
  { t: 8, v: 25 },
  { t: 9, v: 15 },
];


export const sadPathData = {
  inner: [
    { name: "Caller Identification", value: 45, color: "#cfe3f1" },
    { name: "Language Issues", value: 35, color: "#7fb0d6" },
    { name: "Customer Behavior", value: 20, color: "#b7dca8" },
  ],
  /* outer: [
    { name: "Incorrect caller identity", value: 15, color: "#b7d3ea" },
    { name: "User refused to confirm identity", value: 30, color: "#d9ebf7" },

    { name: "Assistant did not speak Spanish", value: 20, color: "#5e9acb" },
    { name: "Assistant did not speak French", value: 10, color: "#9cc7a6" },
    { name: "Unsupported Language", value: 5, color: "#4d86b3" },

    { name: "Customer Hostility", value: 12, color: "#b7dca8" },
    { name: "Verbal Aggression", value: 8, color: "#cfe9b6" },
  ] */
 outer: [
    { name: "User refused to confirm identity", category: "Caller Identification", value: 15, color: "#90c6fa", categoryColor: "#60a5fa" },
    { name: "Caller Identification", category: "Caller Identification", value: 5, color: "#60a5fa", categoryColor: "#60a5fa" }, // This might be a summary slice
    { name: "Incorrect caller identity", category: "Caller Identification", value: 10, color: "#c6e0fa", categoryColor: "#60a5fa" },
    
    { name: "Assistant did not speak Spanish", category: "Unsupported Language", value: 20, color: "#5499dd", categoryColor: "#5499dd" },
    { name: "Unsupported Language", category: "Unsupported Language", value: 10, color: "#4581c7", categoryColor: "#5499dd" }, // Another summary slice
    { name: "Assistant did not speak French", category: "Unsupported Language", value: 15, color: "#3668b0", categoryColor: "#5499dd" },

    { name: "Customer Hostility", category: "Customer Hostility", value: 8, color: "#74afc8", categoryColor: "#74afc8" },
    { name: "Verbal Aggression", category: "Verbal Aggression", value: 17, color: "#93c5fd", categoryColor: "#93c5fd" },
  ],
}