/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fpt.aptech.PRJ.Entities;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author ruava
 */
@Entity
@Table(name = "product")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Product.findAll", query = "SELECT p FROM Product p"),
    @NamedQuery(name = "Product.findById", query = "SELECT p FROM Product p WHERE p.id = :id"),
    @NamedQuery(name = "Product.findByName", query = "SELECT p FROM Product p WHERE p.name = :name"),
    @NamedQuery(name = "Product.findByImage1", query = "SELECT p FROM Product p WHERE p.image1 = :image1"),
    @NamedQuery(name = "Product.findByImage2", query = "SELECT p FROM Product p WHERE p.image2 = :image2"),
    @NamedQuery(name = "Product.findByImage3", query = "SELECT p FROM Product p WHERE p.image3 = :image3"),
    @NamedQuery(name = "Product.findByPrice", query = "SELECT p FROM Product p WHERE p.price = :price"),
    @NamedQuery(name = "Product.findByQuantity", query = "SELECT p FROM Product p WHERE p.quantity = :quantity"),
    @NamedQuery(name = "Product.findByDiscription", query = "SELECT p FROM Product p WHERE p.discription = :discription"),
    @NamedQuery(name = "Product.findByViewcount", query = "SELECT p FROM Product p WHERE p.viewcount = :viewcount"),
    @NamedQuery(name = "Product.findByPurchasecount", query = "SELECT p FROM Product p WHERE p.purchasecount = :purchasecount"),
    @NamedQuery(name = "Product.findByIsactive", query = "SELECT p FROM Product p WHERE p.isactive = :isactive"),
    @NamedQuery(name = "Product.findByLastupdateddate", query = "SELECT p FROM Product p WHERE p.lastupdateddate = :lastupdateddate")})
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Column(name = "name")
    private String name;
    @Column(name = "image1")
    private String image1;
    @Column(name = "image2")
    private String image2;
    @Column(name = "image3")
    private String image3;
    @Column(name = "price")
    private Integer price;
    @Column(name = "quantity")
    private Integer quantity;
    @Column(name = "discription")
    private String discription;
    @Column(name = "viewcount")
    private Integer viewcount;
    @Column(name = "purchasecount")
    private Integer purchasecount;
    @Column(name = "isactive")
    private Boolean isactive;
    @Column(name = "lastupdateddate")
    private String lastupdateddate;
    @JoinColumn(name = "ageid", referencedColumnName = "id")
    @ManyToOne
    private Age ageid;
    @JoinColumn(name = "genderid", referencedColumnName = "id")
    @ManyToOne
    private Gender genderid;
    @JoinColumn(name = "producerid", referencedColumnName = "id")
    @ManyToOne
    private Producer producerid;
    @JoinColumn(name = "categoryid", referencedColumnName = "id")
    @ManyToOne
    private Productcategory categoryid;
    @OneToMany(mappedBy = "productid")
    private List<Itemcart> itemcartList;
    @OneToMany(mappedBy = "productid")
    private List<Rating> ratingList;
    @OneToMany(mappedBy = "productid")
    private List<Qa> qaList;
    @OneToMany(mappedBy = "productid")
    private List<Productviewed> productviewedList;
    @OneToMany(mappedBy = "productid")
    private List<Orderdetail> orderdetailList;

    public Product() {
    }

    public Product(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage1() {
        return image1;
    }

    public void setImage1(String image1) {
        this.image1 = image1;
    }

    public String getImage2() {
        return image2;
    }

    public void setImage2(String image2) {
        this.image2 = image2;
    }

    public String getImage3() {
        return image3;
    }

    public void setImage3(String image3) {
        this.image3 = image3;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getDiscription() {
        return discription;
    }

    public void setDiscription(String discription) {
        this.discription = discription;
    }

    public Integer getViewcount() {
        return viewcount;
    }

    public void setViewcount(Integer viewcount) {
        this.viewcount = viewcount;
    }

    public Integer getPurchasecount() {
        return purchasecount;
    }

    public void setPurchasecount(Integer purchasecount) {
        this.purchasecount = purchasecount;
    }

    public Boolean getIsactive() {
        return isactive;
    }

    public void setIsactive(Boolean isactive) {
        this.isactive = isactive;
    }

    public String getLastupdateddate() {
        return lastupdateddate;
    }

    public void setLastupdateddate(String lastupdateddate) {
        this.lastupdateddate = lastupdateddate;
    }

    public Age getAgeid() {
        return ageid;
    }

    public void setAgeid(Age ageid) {
        this.ageid = ageid;
    }

    public Gender getGenderid() {
        return genderid;
    }

    public void setGenderid(Gender genderid) {
        this.genderid = genderid;
    }

    public Producer getProducerid() {
        return producerid;
    }

    public void setProducerid(Producer producerid) {
        this.producerid = producerid;
    }

    public Productcategory getCategoryid() {
        return categoryid;
    }

    public void setCategoryid(Productcategory categoryid) {
        this.categoryid = categoryid;
    }

    @XmlTransient
    public List<Itemcart> getItemcartList() {
        return itemcartList;
    }

    public void setItemcartList(List<Itemcart> itemcartList) {
        this.itemcartList = itemcartList;
    }

    @XmlTransient
    public List<Rating> getRatingList() {
        return ratingList;
    }

    public void setRatingList(List<Rating> ratingList) {
        this.ratingList = ratingList;
    }

    @XmlTransient
    public List<Qa> getQaList() {
        return qaList;
    }

    public void setQaList(List<Qa> qaList) {
        this.qaList = qaList;
    }

    @XmlTransient
    public List<Productviewed> getProductviewedList() {
        return productviewedList;
    }

    public void setProductviewedList(List<Productviewed> productviewedList) {
        this.productviewedList = productviewedList;
    }

    @XmlTransient
    public List<Orderdetail> getOrderdetailList() {
        return orderdetailList;
    }

    public void setOrderdetailList(List<Orderdetail> orderdetailList) {
        this.orderdetailList = orderdetailList;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Product)) {
            return false;
        }
        Product other = (Product) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "fpt.aptech.PRJ.Entities.Product[ id=" + id + " ]";
    }
    
}
