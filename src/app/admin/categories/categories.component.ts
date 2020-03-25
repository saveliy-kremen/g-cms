import { Component, OnInit, Inject, ViewChild, NgZone } from '@angular/core';

import { CategoryGrpcService } from 'src/app/shared/services/category.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
//Browser
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  isBrowser: boolean
  @ViewChild('treeComponent') treeComponent

  categoriesData: any
  categoryID: string
  translates: {}

  //modal
  modalCategoryDeleteTitle: string
  modalCategoryDeleteText: string
  modalCategoryDeleteButtons: any = [{ title: "Delete", handler: this.deleteCategory.bind(this) }]

  constructor(
    private categoryService: CategoryGrpcService,
    private translateService: TranslateService,
    private modalService: ModalService,
    private loaderService: LoaderService,
    private router: Router,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) platformId
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  async ngOnInit() {
    this.loaderService.showLoader()
    if (this.isBrowser) {
      try {
        let res = await this.categoryService.categories().toPromise()
        this.categoriesData = res.categoriesList
        await this.categoriesTranslate();
        this.translates = {
          "New category": await this.translateService.get("New category").toPromise(),
          "Insert": await this.translateService.get("Insert").toPromise(),
          "Insert before": await this.translateService.get("Insert before").toPromise(),
          "Insert after": await this.translateService.get("Insert after").toPromise(),
          "Edit": await this.translateService.get("Edit").toPromise(),
          "Delete": await this.translateService.get("Delete").toPromise(),
          "Delete Category": await this.translateService.get("Delete Сategory").toPromise(),
          "Delete category": await this.translateService.get("Delete category").toPromise()
        }
        $('#categoryTree').jstree({
          'core': {
            'data': this.categoriesData,
            check_callback: async function (op, node, parent, position, more) {
              if (op === "move_node" && more && more.core) {
                this.loaderService.showLoader()
                try {
                  let res = await this.categoryService.moveCategory({ id: node.id, parent: parent.id, position: position }).toPromise()
                  this.categoriesData = res.categoriesList
                  await this.categoriesTranslate();
                  $('#categoryTree').jstree(true).settings.core.data = this.categoriesData;
                  $('#categoryTree').jstree(true).refresh();
                } catch (err) {
                  console.log(err)
                  $('#categoryTree').jstree(true).refresh();
                }
                this.loaderService.hideLoader()
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
    this.loaderService.hideLoader()
  }

  async categoriesTranslate() {
    for (let i = 0; i < this.categoriesData.length; i++) {
      if (this.categoriesData[i].parent === "#") {
        this.categoriesData[i].text = await this.translateService.get(this.categoriesData[i].text).toPromise();
      }
    }
  }

  async addCategory(data) {
    this.loaderService.showLoader()
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
    this.loaderService.hideLoader()
  }

  async addCategoryBefore(data) {
    this.loaderService.showLoader()
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
    this.loaderService.hideLoader()
  }

  async addCategoryAfter(data) {
    this.loaderService.showLoader()
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
    this.loaderService.hideLoader()
  }

  async deleteCategoryConfirm(id) {
    this.categoryID = id;
    const category = this.categoriesData.filter(item => item.id === id)[0];
    const modalData = {
      title: this.translates["Delete Category"],
      text: `${this.translates["Delete Category"]} "${category.text}" ?`,
      callBackFunction: this.deleteCategory.bind(this)
    };
    this.modalService.showModal(modalData);
  }

  async deleteCategory(confirm) {
    this.loaderService.showLoader()
    try {
      if (confirm) {
        let res = await this.categoryService.deleteCategory(this.categoryID).toPromise()
        this.categoriesData = res.categoriesList
        await this.categoriesTranslate();
        $('#categoryTree').jstree(true).settings.core.data = this.categoriesData;
        $('#categoryTree').jstree(true).refresh();
      }
    } catch (err) {
      console.log(err)
      $('#categoryTree').jstree(true).refresh();
    }
    this.loaderService.hideLoader()
  }

  customMenu(node) {
    var items = {
      insertItem: {
        label: this.translates["Insert"],
        icon: "glyphicon glyphicon-chevron-right",
        action: function (data) {
          var inst = $.jstree.reference(data.reference),
            obj = inst.get_node(data.reference);
          inst.create_node(obj, {}, "last", function (new_node) {
            inst.edit(new_node, this.translates["New category"], this.addCategory.bind(this));
          }.bind(this));
        }.bind(this)
      },
      beforeItem: {
        label: this.translates["Insert before"],
        icon: "glyphicon glyphicon-chevron-up",
        _disabled: node.parent == '#',
        action: function (data) {
          var inst = $.jstree.reference(data.reference),
            obj = inst.get_node(data.reference);
          inst.create_node(obj, {}, "first", function (new_node) {
            inst.edit(new_node, this.translates["New category"], this.addCategoryBefore.bind(this));
          }.bind(this));
        }.bind(this)
      },
      afterItem: {
        label: this.translates["Insert after"],
        icon: "glyphicon glyphicon-chevron-down",
        _disabled: node.parent == '#',
        action: function (data) {
          var inst = $.jstree.reference(data.reference),
            obj = inst.get_node(data.reference);
          inst.create_node(obj, {}, "last", function (new_node) {
            inst.edit(new_node, this.translates["New category"], this.addCategoryAfter.bind(this));
          }.bind(this));
        }.bind(this)
      },
      renameItem: {
        label: this.translates["Edit"],
        icon: "glyphicon glyphicon-edit",
        separator_before: true,
        _disabled: node.parent == '#',
        action: function () {
          if (node.parent != '#') this.ngZone.run(() => this.router.navigate(["/admin/categories/edit", node.original.alias]));
        }.bind(this)
      },
      deleteItem: {
        label: this.translates["Delete"],
        icon: "glyphicon glyphicon-trash",
        _disabled: node.parent == '#',
        action: () => this.deleteCategoryConfirm(node.id)
      }
    };
    return items;
  }
}