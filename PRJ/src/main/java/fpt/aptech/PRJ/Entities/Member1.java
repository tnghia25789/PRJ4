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
@Table(name = "member")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Member1.findAll", query = "SELECT m FROM Member1 m"),
    @NamedQuery(name = "Member1.findById", query = "SELECT m FROM Member1 m WHERE m.id = :id"),
    @NamedQuery(name = "Member1.findByUsername", query = "SELECT m FROM Member1 m WHERE m.username = :username"),
    @NamedQuery(name = "Member1.findByPassword", query = "SELECT m FROM Member1 m WHERE m.password = :password"),
    @NamedQuery(name = "Member1.findByFullname", query = "SELECT m FROM Member1 m WHERE m.fullname = :fullname"),
    @NamedQuery(name = "Member1.findByAddress", query = "SELECT m FROM Member1 m WHERE m.address = :address"),
    @NamedQuery(name = "Member1.findByEmail", query = "SELECT m FROM Member1 m WHERE m.email = :email"),
    @NamedQuery(name = "Member1.findByPhone", query = "SELECT m FROM Member1 m WHERE m.phone = :phone"),
    @NamedQuery(name = "Member1.findByEmailconfirmed", query = "SELECT m FROM Member1 m WHERE m.emailconfirmed = :emailconfirmed"),
    @NamedQuery(name = "Member1.findByAmountpurchased", query = "SELECT m FROM Member1 m WHERE m.amountpurchased = :amountpurchased"),
    @NamedQuery(name = "Member1.findByImage", query = "SELECT m FROM Member1 m WHERE m.image = :image"),
    @NamedQuery(name = "Member1.findByIsactive", query = "SELECT m FROM Member1 m WHERE m.isactive = :isactive")})
public class Member1 implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;
    @Column(name = "fullname")
    private String fullname;
    @Column(name = "address")
    private String address;
    @Column(name = "email")
    private String email;
    @Column(name = "phone")
    private String phone;
    @Column(name = "emailconfirmed")
    private String emailconfirmed;
    @Column(name = "amountpurchased")
    private Integer amountpurchased;
    @Column(name = "image")
    private String image;
    @Column(name = "isactive")
    private Boolean isactive;
    @OneToMany(mappedBy = "memberid")
    private List<Itemcart> itemcartList;
    @OneToMany(mappedBy = "memberid")
    private List<Rating> ratingList;
    @OneToMany(mappedBy = "memberid")
    private List<Qa> qaList;
    @OneToMany(mappedBy = "memberid")
    private List<Productviewed> productviewedList;
    @OneToMany(mappedBy = "memberid")
    private List<Order1> order1List;

    public Member1() {
    }

    public Member1(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmailconfirmed() {
        return emailconfirmed;
    }

    public void setEmailconfirmed(String emailconfirmed) {
        this.emailconfirmed = emailconfirmed;
    }

    public Integer getAmountpurchased() {
        return amountpurchased;
    }

    public void setAmountpurchased(Integer amountpurchased) {
        this.amountpurchased = amountpurchased;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Boolean getIsactive() {
        return isactive;
    }

    public void setIsactive(Boolean isactive) {
        this.isactive = isactive;
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
    public List<Order1> getOrder1List() {
        return order1List;
    }

    public void setOrder1List(List<Order1> order1List) {
        this.order1List = order1List;
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
        if (!(object instanceof Member1)) {
            return false;
        }
        Member1 other = (Member1) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "fpt.aptech.PRJ.Entities.Member1[ id=" + id + " ]";
    }
    
}
