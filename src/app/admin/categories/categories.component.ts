import { Component, OnInit, Inject, ViewChild } from '@angular/core';

import { Category } from 'src/app/shared/api/v1/category_pb';
import { CategoryGrpcService } from 'src/app/shared/services/category.service';
//Browser
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from 'src/app/shared/modal/modal.service';

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
    private modalService: ModalService,
    @Inject(PLATFORM_ID) platformId
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  async ngOnInit() {
    if (this.isBrowser) {
      try {
        let res = await this.categoryService.categories().toPromise()
        this.categoriesData = res.categoriesList
        await this.categoriesTranslate();
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

  async categoriesTranslate() {
    for (let i = 0; i < this.categoriesData.length; i++) {
      if (this.categoriesData[i].parent === "#") {
        this.categoriesData[i].text = await this.translateService.get(this.categoriesData[i].text).toPromise();
      }
    }
  }

  async addCategory(data) {
    try {
      let res = await this.categoryService.addCategory(data).toPromise()
      this.categoriesData = res.categoriesList
      await this.categoriesTranslate();
      $('#categoryTree').jstree(true).settings.core.data = this.categoriesData;
      $('#categoryTree').jstree(true).refresh();
    } catch (err) {
      console.log(err)
      $('#categoryTree').jstree(true).refresh();
    }
  }

  async addCategoryBefore(data) {
    try {
      let res = await this.categoryService.addCategoryBefore(data).toPromise()
      this.categoriesData = res.categoriesList
      await this.categoriesTranslate();
      $('#categoryTree').jstree(true).settings.core.data = this.categoriesData;
      $('#categoryTree').jstree(true).refresh();
    } catch (err) {
      console.log(err)
      $('#categoryTree').jstree(true).refresh();
    }
  }

  async addCategoryAfter(data) {
    try {
      let res = await this.categoryService.addCategoryAfter(data).toPromise()
      this.categoriesData = res.categoriesList
      await this.categoriesTranslate();
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
    const modalData = {
      title: "Delete Category",
      text: `Delete category "${category.text}" ?`,
      callBackFunction: this.deleteCategory.bind(this)
    };
    this.modalService.showModal(modalData);
  }

  async deleteCategory(confirm) {
    try {
      if (confirm) {
        console.log("delete")
        /*
        let res = await this.categoryService.deleteCategory(this.categoryID).toPromise()
        this.categoriesData = res.categoriesList
        await this.categoriesTranslate();
        */
        $('#categoryTree').jstree(true).settings.core.data = this.categoriesData;
        $('#categoryTree').jstree(true).refresh();
      }
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