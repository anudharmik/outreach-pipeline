export function generateEmail(prospect) {
  return {
    subject: `Idea for ${prospect.companyName}'s tech stack`,

    body: `
Hi ${prospect.firstName},

I have been following ${prospect.companyName}'s recent trajectory. Given your role as ${prospect.title}, I imagine optimizing your team's output is always top of mind.

We build zero-touch automation pipelines for fast-growing teams. Our platform completely eliminates manual data entry so your engineers can focus on building core product instead of repetitive workflows.

Are you opposed to me sending over a short, 2-minute breakdown of how this works?

Best regards,
Anurag
`,
  };
}