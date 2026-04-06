import { PolaroidMilestone } from "./PolaroidMilestone";
import { PostcardMilestone } from "./PostcardMilestone";
import { MinimalMilestone } from "./MinimalMilestone";

// ─── Shared types — imported by every variant ─────────────────────────────────

export type MilestoneVariant = "polaroid" | "postcard" | "minimal";

export interface MilestoneDisplayProps {
  year: string;
  location: string;
  flag: string;
  title: string;
  desc: string;
  image?: string;
  index: number;
  variant?: MilestoneVariant;
}

// ─── Router ───────────────────────────────────────────────────────────────────

/**
 * MilestoneDisplay
 *
 * Pure router — owns the shared type contract and delegates rendering
 * to the appropriate variant component. No visual logic lives here.
 *
 * Variants:
 *   "polaroid"  — PolaroidMilestone.tsx   scattered Polaroid photos, drops in from above
 *   "postcard"  — PostcardMilestone.tsx   travel postcard with stamp + postmark, slides from sides
 *   "minimal"   — MinimalMilestone.tsx    editorial text layout, large year numeral, fades up
 *
 * Usage:
 *   <MilestoneDisplay variant="polaroid" {...milestoneProps} />
 *   <MilestoneDisplay variant="postcard" {...milestoneProps} />
 *   <MilestoneDisplay variant="minimal"  {...milestoneProps} />
 */
export const MilestoneDisplay = ({
  variant = "polaroid",
  ...props
}: MilestoneDisplayProps) => {
  switch (variant) {
    case "postcard":
      return <PostcardMilestone {...props} />;
    case "minimal":
      return <MinimalMilestone {...props} />;
    case "polaroid":
    default:
      return <PolaroidMilestone {...props} />;
  }
};
