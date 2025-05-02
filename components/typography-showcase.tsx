import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
} from "@/components/ui/typography"

export function TypographyShowcase() {
  return (
    <div className="container py-10 space-y-10">
      <div>
        <TypographyH1>Typography System</TypographyH1>
        <TypographyLead>
          A consistent typography system using Roboto for RenewAI's technology-focused website.
        </TypographyLead>
      </div>

      <div className="space-y-4">
        <TypographyH2>Heading Styles</TypographyH2>
        <div className="space-y-2">
          <TypographyH1>Heading 1</TypographyH1>
          <TypographyH2>Heading 2</TypographyH2>
          <TypographyH3>Heading 3</TypographyH3>
          <TypographyH4>Heading 4</TypographyH4>
        </div>
      </div>

      <div className="space-y-4">
        <TypographyH2>Paragraph Styles</TypographyH2>
        <TypographyP>
          This is a standard paragraph. RenewAI utilizes artificial intelligence and geospatial analysis to optimize
          renewable energy projects. Our platform identifies optimal sites for renewable projects, provides intelligent
          monitoring of energy infrastructure, optimizes predictive maintenance, and conducts environmental impact
          assessments.
        </TypographyP>
        <TypographyLead>This is a lead paragraph, used for introductions or important information.</TypographyLead>
        <TypographyLarge>This is large text, used for emphasizing important points.</TypographyLarge>
        <TypographySmall>This is small text, used for captions or footnotes.</TypographySmall>
        <TypographyMuted>This is muted text, used for secondary information.</TypographyMuted>
      </div>
    </div>
  )
}
