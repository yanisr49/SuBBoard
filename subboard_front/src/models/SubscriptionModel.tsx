import Model from './Model';
import TagModel from './TagModel';

interface CardModel extends Model {
  id: number;
  name: string;
  color: string;
  tags: TagModel[];
}

export default CardModel;
