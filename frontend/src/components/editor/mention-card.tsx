interface Mention {}

export interface MentionCardProps {
  onSelect: (
    userIds: {
      id: string;
      role: string;
    }[]
  ) => void;
}

const MentionCard = () => {};
