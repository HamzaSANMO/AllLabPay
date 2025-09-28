import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { TpService } from "../../services/tp.service";
import { AuthService } from "../../services/auth.service";
import { RoleService } from "../../services/role.service";
import { TP } from "../../models/tp.model";
import { User } from "../../models/auth.model";

@Component({
  selector: "app-tp-list",
  templateUrl: "./tp-list.component.html",
  styleUrls: ["./tp-list.component.css"],
})
export class TpListComponent implements OnInit {
  currentUser: User | null = null;
  isLoading = true;
  tps: TP[] = [];
  filteredTPs: TP[] = [];

  filieres: any[] = [];
  niveaux: any[] = [];

  // valeurs des filtres
  selectedFiliere = "";
  selectedNiveau = "";
  searchTerm = "";

  constructor(
    private tpService: TpService,
    private authService: AuthService,
    private roleService: RoleService,
    public router: Router
  ) {}

  ngOnInit(): void {
    if (!this.roleService.isStudent()) {
      this.router.navigate(["/"]);
      return;
    }

    this.authService.authState$.subscribe((state) => {
      this.currentUser = state.user;
      if (state.user) {
        this.loadTPs();
      }
    });
  }

  loadTPs(): void {
    this.isLoading = true;

    const filiereId = this.currentUser?.filiere?.id;

    const obs = filiereId
      ? this.tpService.getAvailableTPsByFiliere(filiereId)
      : this.tpService.getAllTps();

    obs.subscribe({
      next: (tps) => {
        this.tps = tps;
        this.filteredTPs = tps;
        this.extractFilterOptions();
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  extractFilterOptions(): void {
    const filiereSet = new Set();
    const niveauSet = new Set();

    this.tps.forEach((tp) => {
      if (tp.filiere) filiereSet.add(JSON.stringify(tp.filiere));
      if (tp.niveau) niveauSet.add(JSON.stringify(tp.niveau));
    });

    this.filieres = Array.from(filiereSet).map((f) => JSON.parse(f as string));
    this.niveaux = Array.from(niveauSet).map((n) => JSON.parse(n as string));
  }

  applyFilters(search: string, filiereId: string, niveauId: string): void {
    this.searchTerm = search;
    this.selectedFiliere = filiereId;
    this.selectedNiveau = niveauId;

    this.filteredTPs = this.tps.filter((tp) => {
  const matchesFiliere = !filiereId || tp.filiere === filiereId;
  const matchesNiveau = !niveauId || tp.niveau === niveauId;

  const matchesSearch =
    !search ||
    tp.title.toLowerCase().includes(search.toLowerCase()) ||
    tp.description.toLowerCase().includes(search.toLowerCase());

  return matchesFiliere && matchesNiveau && matchesSearch;
});
  }

  clearFilters(
    searchInput: HTMLInputElement,
    filiereSelect: HTMLSelectElement,
    niveauSelect: HTMLSelectElement
  ): void {
    searchInput.value = "";
    filiereSelect.value = "";
    niveauSelect.value = "";
    this.applyFilters("", "", "");
  }

  viewTPDetails(tpId: number): void {
    this.router.navigate(["/student/tps", tpId]);
  }

  payForTP(tpId: number): void {
    this.router.navigate(["/student/payment", tpId]);
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-100 text-green-800";
      case "FULL":
        return "bg-red-100 text-red-800";
      case "CLOSED":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case "AVAILABLE":
        return "Disponible";
      case "FULL":
        return "Complet";
      case "CLOSED":
        return "Fermé";
      default:
        return status;
    }
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(price);
  }

  formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}
