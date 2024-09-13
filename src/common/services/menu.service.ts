import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from '../entities/menu.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenuService {
  constructor(@InjectRepository(Menu) private menuRepo: Repository<Menu>) {}

  async loadMenu() {
    const query = `
      WITH RECURSIVE MenuHierarchy AS (
          SELECT 
              id, 
              title, 
              up_id, 
              order_no,
              service_code,
              note,
              1 AS level
          FROM 
              menu
          WHERE 
              up_id IS 0  -- 최상위 메뉴 (루트 메뉴)

          UNION ALL

          SELECT 
              m.id, 
              m.title, 
              m.up_id, 
              m.order_no,
              m.service_code,
              m.note,
              mh.level + 1 AS level
          FROM 
              menu m
          INNER JOIN 
              MenuHierarchy mh 
          ON 
              m.up_id = mh.id
      )
      SELECT * FROM MenuHierarchy;
    `;
    const result = await this.menuRepo.query(query);

    function buildTree(data: Menu[]): Menu[] {
        const tree: Menu[] = [];
        const map: { [key: number]: Menu } = {};
      
        // 각 메뉴 항목을 맵에 저장하여 빠르게 부모-자식 연결할 수 있도록 함
        data.forEach((item) => {
          map[item.id] = { ...item, _children: [] };
        });
      
        // 각 메뉴의 부모를 찾아 _children에 추가
        data.forEach((item) => {
          if (item.up_id !== 0) {
            if (map[item.up_id]) {
              map[item.up_id]._children!.push(map[item.id]);
            }
          } else {
            tree.push(map[item.id]);
          }
        });
      
        // _children 배열이 비어 있으면 해당 속성을 삭제
        function removeEmptyChildren(node: Menu) {
          if (node._children && node._children.length === 0) {
            delete node._children;
          } else if (node._children) {
            node._children.forEach(removeEmptyChildren);
          }
        }
      
        tree.forEach(removeEmptyChildren);
      
        return tree;
      }


    return buildTree(result);

    // return this.menuRepo.createQueryBuilder('m1')
    // .select(['m1.title AS main_menu', 'm2.title AS sub_menu', 'm2.service_code AS service_code'])
    // .innerJoin(Menu, 'm2', 'm1.menu_id = m2.up_menu_id')
    // .where('m1.level_no = :mainLevel', { mainLevel: 1 })
    // .andWhere('m2.level_no = :subLevel', { subLevel: 2 })
    // .getRawMany();
  }
}
