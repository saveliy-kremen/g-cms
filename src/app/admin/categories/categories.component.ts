import { Component, OnInit, Inject, ViewChild } from '@angular/core';

import { Category } from 'src/app/shared/api/v1/category_pb';
import { CategoryGrpcService } from 'src/app/shared/services/category.service';
//Browser
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

declare var $: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  isBrowser: boolean;
  @ViewChild('treeComponent') treeComponent;

  categoriesData: any;
  categoryID: string;

  //modal
  modalCategoryDeleteTitle: string;
  modalCategoryDeleteText: string;
  modalCategoryDeleteButtons: any = [{ title: "Delete", handler: this.deleteCategory.bind(this) }];

  constructor(
    private categoryService: CategoryGrpcService,
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) platformId
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  async ngOnInit() {
    if (this.isBrowser) {
      try {
        let res = await this.categoryService.categories().toPromise()
        this.categoriesData = res.categoriesList
        for (let i = 0; i < this.categoriesData.length; i++) {
          if (this.categoriesData[i].parent === "#") {
            this.categoriesData[i].text = await this.translateService.get(this.categoriesData[i].text).toPromise();
          }
        }
        $('#categoryTree').jstree({
          'core': {
            'data': this.categoriesData,
            check_callback: async function (op, node, parent, position, more) {
              if (op === "move_node" && more && more.core) {
                try {
                  //const res: any = await this.graphql.categoryMoveNode(node.id, parent.id != "#" ? parent.id : null, position);
                  //this.categoriesData = res.data.categoryMoveNode;
                  $('#categoryTree').jstree(true).settings.core.data = this.categoriesData;
                  $('#categoryTree').jstree(true).refresh();
                } catch (err) {
                  console.log(err)
                  $('#categoryTree').jstree(true).refresh();
                }
                return true;
              }
            }.bind(this)
          },
          contextmenu: {
            items: this.customMenu.bind(this),
          },
          "plugins": ["dnd", "contextmenu"],
        });
      } catch (err) {
        console.log(err)
      }
    }
  }

  async addCategory(data) {
    try {
      //const res: any = await this.graphql.addCategory(data.id, data.parent, data.text, null);
      //this.categoriesData = res.data.addCategory;
      $('#categoryTree').jstree(true).settings.core.data = this.categoriesData;
      $('#categoryTree').jstree(true).refresh();
    } catch (err) {
      console.log(err)
      $('#categoryTree').jstree(true).refresh();
    }
  }

  async addCategoryBefore(data) {
    try {
      //const res: any = await this.graphql.addCategoryBefore(data.id, data.parent, data.text, null);
      //this.categoriesData = res.data.addCategoryBefore;
      $('#categoryTree').jstree(true).settings.core.data = this.categoriesData;
      $('#categoryTree').jstree(true).refresh();
    } catch (err) {
      console.log(err)
      $('#categoryTree').jstree(true).refresh();
    }
  }

  async addCategoryAfter(data) {
    try {
      //const res: any = await this.graphql.addCategoryAfter(data.id, data.parent, data.text, null);
      //this.categoriesData = res.data.addCategoryAfter;
      $('#categoryTree').jstree(true).settings.core.data = this.categoriesData;
      $('#categoryTree').jstree(true).refresh();
    } catch (err) {
      console.log(err)
      $('#categoryTree').jstree(true).refresh();
    }
  }

  deleteCategoryConfirm(id) {
    this.categoryID = id;
    const category = this.categoriesData.filter(item => item.id === id)[0];
    this.modalCategoryDeleteTitle = "Delete Category";
    this.modalCategoryDeleteText = `Delete category "${category.text}" ?`;
    $('#modalCategoryDelete').modal('show');
  }

  async deleteCategory() {
    try {
      //const res: any = await this.graphql.deleteCategory(this.categoryID);
      //this.categoriesData = res.data.categoryDelete;
      $('#categoryTree').jstree(true).settings.core.data = this.categoriesData;
      $('#categoryTree').jstree(true).refresh();
      $('#modalCategoryDelete').modal('hide');
    } catch (err) {
      console.log(err)
      $('#categoryTree').jstree(true).refresh();
    }
  }

  customMenu(node) {
    var items = {
      insertItem: {
        label: "Вставить",
        icon: "glyphicon glyphicon-menu-down",
        action: function (data) {
          var inst = $.jstree.reference(data.reference),
            obj = inst.get_node(data.reference);
          inst.create_node(obj, {}, "last", function (new_node) {
            inst.edit(new_node, 'Новая категория', this.addCategory.bind(this));
          }.bind(this));
        }.bind(this)
      },
      beforeItem: {
        label: "Вставить перед",
        icon: "glyphicon glyphicon-menu-left",
        _disabled: node.parent == '#',
        action: function (data) {
          var inst = $.jstree.reference(data.reference),
            obj = inst.get_node(data.reference);
          inst.create_node(obj, {}, "first", function (new_node) {
            inst.edit(new_node, 'Новая категория', this.addCategoryBefore.bind(this));
          }.bind(this));
        }.bind(this)
      },
      afterItem: {
        label: "Вставить после",
        icon: "glyphicon glyphicon-menu-right",
        _disabled: node.parent == '#',
        action: function (data) {
          var inst = $.jstree.reference(data.reference),
            obj = inst.get_node(data.reference);
          inst.create_node(obj, {}, "last", function (new_node) {
            inst.edit(new_node, 'Новая категория', this.addCategoryAfter.bind(this));
          }.bind(this));
        }.bind(this)
      },
      renameItem: {
        label: "Редактировать",
        icon: "glyphicon glyphicon-edit",
        separator_before: true,
        _disabled: node.parent == '#',
        action: function () {
          if (node.parent != '#') this.ngZone.run(() => this.router.navigate(["/admin/categories/edit", node.original.alias]));
        }.bind(this)
      },
      deleteItem: {
        label: "Удалить",
        icon: "glyphicon glyphicon-trash",
        _disabled: node.parent == '#',
        action: () => this.deleteCategoryConfirm(node.id)
      }
    };
    return items;
  }
}