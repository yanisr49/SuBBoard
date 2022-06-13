import TagModel from '../../models/TagModel';

interface Props {
  tag: TagModel;
}

export default function Chip({ tag }: Props) {
  return <div>{tag.name}</div>;
}
