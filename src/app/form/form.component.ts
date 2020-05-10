import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { CategoriesService } from "../../services/categories.service";
import { TaskService } from "../../services/task.service";
import { ICategory } from "../../models/ICategory.model";
import { ISubcategory } from "../../models/ISubcategory.model";
import { UserService } from "src/services/user.service";
import { IUser } from "src/models/IUser.model";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
})
export class FormComponent implements OnInit {
  isLoading: boolean = false;
  currentCategoryObject: ICategory;
  currentSubcategoryObject: ISubcategory;
  categories: ICategory[] = [];
  signedInUser: IUser;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private userService: UserService
  ) {}

  get categoryFromUrl(): string {
    return this.route.snapshot.paramMap.get("category");
  }

  get subcategoryFromUrl(): string {
    return this.route.snapshot.paramMap.get("subcategory");
  }

  // form: FormGroup;
  form = this.formBuilder.group({
    description: ["", Validators.required],
    category: [this.categoryFromUrl, Validators.required],
    subcategory: [this.subcategoryFromUrl, Validators.required],
    comment: ["", Validators.required],
    executionTime: this.formBuilder.group({
      time: ["start", Validators.required],
      startDate: [+new Date(), Validators.required],
      startTime: [+new Date(), Validators.required],
      endDate: null,
      endTime: null,
    }),
    address: ["", Validators.required], // it will be FormArray
    budget: "",
    author: [""],
    authorId: ["", Validators.required],
    email: ["", Validators.required],
    tel: ["", Validators.required],
    additionalConditions: this.formBuilder.group({
      isSubscribeSuggestions: false,
      isShowOnlyToExecutors: false,
    }),
    isBusiness: false,
    isSbr: true,
  });

  ngOnInit(): void {
    this.isLoading = true;

    this.categoriesService.categoriesListener$.subscribe(
      (value: ICategory[]) => {
        this.categories = value;

        if (this.categories) {
          this.currentCategoryObject = this.categories.find(
            (category: ICategory) => category.key === this.categoryFromUrl
          );

          this.currentSubcategoryObject = this.currentCategoryObject.subcategories.find(
            (subcategory: ISubcategory) =>
              subcategory.code === this.subcategoryFromUrl
          );

          this.isLoading = false;
        }
      }
    );

    this.userService.currentUserListener$.subscribe((response: IUser) => {
      this.signedInUser = response;
      if (this.signedInUser) {
        this.form.get("authorId").patchValue(this.signedInUser._id);
        this.form.get("email").patchValue(this.signedInUser.contacts.email);
        this.form.get("tel").patchValue(this.signedInUser.contacts.phone);
        this.form
          .get("author")
          .patchValue(this.signedInUser.personalInfo.firstName);
      }
    });
  }

  updateSelectSubcategory(): void {
    this.currentCategoryObject = this.categories.find(
      (category: ICategory) => category.key === this.form.get("category").value
    );
    this.form.controls.subcategory.patchValue(
      this.currentCategoryObject.subcategories[0].code
    );
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const newTask = {
      createDate: +new Date(),
      ...this.form.value,
      reviews: {
        positive: 0,
        negative: 0,
      },
    };
    newTask.executionTime = {
      startDate: +new Date(
        newTask.executionTime.startDate + " " + newTask.executionTime.startTime
      ),
      startTime: +new Date(
        newTask.executionTime.startDate + " " + newTask.executionTime.startTime
      ),
      endDate: +new Date(
        newTask.executionTime.endTime + " " + newTask.executionTime.endDate
      ),
      endTime: +new Date(
        newTask.executionTime.endTime + " " + newTask.executionTime.endDate
      ),
    };
    this.taskService.createTask(newTask).subscribe(console.log);
    console.warn(this.form.value);
    this.form.reset();
  }
}
