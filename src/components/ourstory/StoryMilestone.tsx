import { MilestoneDisplay, type MilestoneVariant } from "./MilestoneDisplay";

interface StoryMilestoneProps {
  year: string;
  title: string;
  desc: string;
  image?: string;
  index: number;
  location: string;
  flag: string;

  /** Pass through to MilestoneDisplay to change the whole visual style */
  variant?: MilestoneVariant;
}

/**
 * StoryMilestone
 *
 * Thin shell: owns the vertical rhythm + spacing in the timeline,
 * but delegates all visual rendering to MilestoneDisplay.
 *
 * Sticky stacking: each card pins at a progressively lower top offset
 * so the pile builds as the user scrolls. The next card lands on top
 * of the previous one, matching the drop-in animation in MilestoneDisplay.
 */
export const StoryMilestone = ({
  variant = "polaroid",
  index,
  ...props
}: StoryMilestoneProps) => (
  <div
    style={{
      position: "sticky",
      // Each card pins a little lower so the pile is visible beneath
      top: `${64 + index * 20}px`,
      // Later cards render on top of earlier ones
      zIndex: index + 1,
      // Give each card enough scroll travel before the next one arrives
      paddingBottom: "120px",
    }}
  >
    <MilestoneDisplay variant={variant} index={index} {...props} />
  </div>
);
